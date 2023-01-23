package business.order;

import api.ApiException;
import business.book.Book;
import business.book.BookDao;
import business.cart.ShoppingCart;
import business.customer.CustomerForm;


import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.regex.Pattern;

public class DefaultOrderService implements OrderService {

	private BookDao bookDao;

	public void setBookDao(BookDao bookDao) {
		this.bookDao = bookDao;
	}

	@Override
	public OrderDetails getOrderDetails(long orderId) {
		// NOTE: THIS METHOD PROVIDED NEXT PROJECT
		return null;
	}

	@Override
	public long placeOrder(CustomerForm customerForm, ShoppingCart cart) {

		validateCustomer(customerForm);
		validateCart(cart);

		// NOTE: MORE CODE PROVIDED NEXT PROJECT

		return -1;
	}


	private void validateCustomer(CustomerForm customerForm)  {

		String name = customerForm.getName();

		String phoneNumber = customerForm.getPhone();
		String ccNumber = customerForm.getCcNumber();
		String email = customerForm.getEmail();
		String address = customerForm.getAddress();

		if (name == null || name.equals("") || name.length() > 45) {
			throw new ApiException.InvalidParameter("Invalid name field");
		}


		if (address == null || address.equals("") || address.length() > 45) {
			throw new ApiException.InvalidParameter("Invalid address field");
		}

		String cleanedPhoneNumber = phoneNumber.replaceAll("[^+\\d]", "");
		if (cleanedPhoneNumber.length()!=10) {
			throw new ApiException.InvalidParameter("Invalid phone number field" + cleanedPhoneNumber);
		}

		String ccNumberCleaned = ccNumber.replaceAll("[^+\\d]", "");
		if (ccNumberCleaned.length() > 16 || ccNumberCleaned.length()<14) {
			throw new ApiException.InvalidParameter("Invalid credit card number field");
		}
		String EMAIL_PATTERN =
				"^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
						+ "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
		//TODO EMail pending
//		String emailRegex = "[a-zA-Z0-9]{1,}[@]{1}[a-z]{5,}[.]{1}+[a-z]{3}";
		if (!Pattern.matches(EMAIL_PATTERN, email)) {
			throw new ApiException.InvalidParameter("Invalid email field");
		}

		// TODO: Validation checks for address, phone, email, ccNumber

		// TODO: return true when the provided month/year is before the current month/yeaR
		// HINT: Use Integer.parseInt and the YearMonth class
		Date currDate = new Date();
		Calendar cal = Calendar.getInstance();
		cal.setTime(currDate);
		if (expiryDateIsInvalid(customerForm.getCcExpiryMonth(), customerForm.getCcExpiryYear())) {
			throw new ApiException.InvalidParameter("Invalid expiry date "+cal.get(Calendar.YEAR)+" "+cal.get(Calendar.MONTH)+Integer.parseInt(customerForm.getCcExpiryYear())+Integer.parseInt(customerForm.getCcExpiryMonth()));
		}
	}

	private boolean expiryDateIsInvalid(String ccExpiryMonth, String ccExpiryYear) {

		// TODO: return true when the provided month/year is before the current month/yeaR
//		// HINT: Use Integer.parseInt and the YearMonth class

		Date currDate = new Date();
		Calendar cal = Calendar.getInstance();
		cal.setTime(currDate);
		if ( cal.get(Calendar.YEAR) > Integer.parseInt(ccExpiryYear) ){
			return true;
		} else if (cal.get(Calendar.YEAR)== Integer.parseInt(ccExpiryYear)) {
			return cal.get(Calendar.MONTH)+1 > Integer.parseInt(ccExpiryMonth);
		}
		return false;
	}


	private void validateCart(ShoppingCart cart) {

		if (cart.getItems().size() == 0) {
			throw new ApiException.InvalidParameter("Cart is empty.");
		}

		cart.getItems().forEach(item-> {
			if (item.getQuantity() < 0 || item.getQuantity() > 99) {
				throw new ApiException.InvalidParameter("Invalid quantity");
			}
			Book databaseBook = bookDao.findByBookId(item.getBookId());
			if ( item.getBookForm().getPrice() != databaseBook.getPrice()){
				throw new ApiException.InvalidParameter("Invalid price");
			}
			if (item.getBookForm().getCategoryId() != databaseBook.getCategoryId()) {
				throw new ApiException.InvalidParameter("Invalid category");
			}


			// TODO: complete the required validations
		});
	}

}