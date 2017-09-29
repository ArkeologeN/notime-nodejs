const expect = require("chai").expect;
const NoTime = require("../../lib/notime");

describe("#NoTime", function() {
  this.timeout(10000);
  const opts = {
    primaryKey: process.env.NOTIME_PKEY,
    secondaryKey: process.env.NOTIME_SKEY,
    groupGuid: process.env.NOTIME_GGUID
  };

  it("should be exported class", () => {
    expect(NoTime).to.be.a("function");
  });

  it("should throw an error if `primaryKey` is missing", () => {
    const fn = () => new NoTime();
    expect(fn).to.throw(/primaryKey/);
  });

  it("should throw an error if `secondaryKey` is missing", () => {
    const fn = () => new NoTime({ primaryKey: "no" });
    expect(fn).to.throw(/secondaryKey/);
  });

  it("should throw an error if `groupGuid` is missing", () => {
    const fn = () => new NoTime({ primaryKey: "no", secondaryKey: "no" });
    expect(fn).to.throw(/groupGuid/);
  });

  it("should set the opts values as private variable", () => {
    const noTime = new NoTime(opts);
    expect(noTime).to.be.an("object");
    expect(noTime._opts).to.be.an("object");
    expect(noTime._opts.primaryKey).to.equal(opts.primaryKey);
    expect(noTime._opts.secondaryKey).to.equal(opts.secondaryKey);
    expect(noTime._opts.groupGuid).to.equal(opts.groupGuid);
  });

  describe("implementation", () => {
    const noTime = new NoTime(opts);

    before(function() {
      if (!opts.groupGuid || !opts.secondaryKey || !opts.primaryKey) {
        console.warn('WARN: Please provide (primaryKey, secondaryKey, groupGuid) in env. variable to run test.');
        this.skip();
      }
    });

    it("should have a `shipmentCreate` method", () => {
      expect(noTime.shipmentCreate).to.be.a("function");
    });

    it("should create a shipment", () => {
      const payload = {
        PickupDate: '2017-01-01',
        PickupTimeFrom: '13:22:22Z',
        PickupTimeTo: '13:40:22Z',
        DropoffTimeFrom: '14:00:00Z',
        DropoffTimeTo: '14:10:00Z',
        PaymentType: 1,
        ShipmentType: 100,
        Pickup: {
          Name: 'Cilantro Bar & Grill',
          Phone: '+49123231112',
          City: 'Zurich',
          CountryCode: 'CH',
          Postcode: '8004',
          Streetaddress: 'Badenerstrasse 97'
        },
        Dropoff: {
          Name: 'notime AG',
          Phone: '+41 44 508 48 48',
          City: 'Zurich',
          CountryCode: 'CH',
          Postcode: '8003',
          Streetaddress: 'Birmensdorferstrasse 94'
        },
        Reference: '2232'        
      };
      return noTime
        .shipmentCreate(payload)
        .then(response => {
          expect(response).to.be.an("object");
          expect(response.ResultCode).to.equal(0);
          expect(response.ResultText).to.equal('Success');
          expect(response.ShipmentGuid).to.be.ok;
          expect(response.PickupReference).to.be.ok;
          expect(response.DropoffReference).to.be.ok;
          expect(response.ProductsReferences).to.be.an('array');
          expect(response.Reference).to.be.ok;
          expect(response.GeneratedBarcode).to.be.ok;
          expect(response.ErrorString).to.be.null;
        })
        .catch(err => {
          expect(err).to.not.be.ok;
        });
    });
  });
});
