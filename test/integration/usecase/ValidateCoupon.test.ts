import ValidateCoupon from "../../../src/application/usecase/validate_coupon/ValidateCoupon";
import PgPromiseConnectionAdapter from "../../../src/infra/database/PgPromiseConnectionAdapter";
import CouponRepositoryDatabase from "../../../src/infra/repository/database/CouponRepositoryDatabase";

test("Deve validar um cupom de desconto", async function () {
	const connection = PgPromiseConnectionAdapter.getInstance();
	const couponRepository = new CouponRepositoryDatabase(connection);
	const validateCoupon = new ValidateCoupon(couponRepository);
	const output = await validateCoupon.execute("VALE20");
	expect(output.isValid).toBeTruthy();
});
