import React from 'react'
import './shopCourses.css'
import './styleAll.css'
import NavBar from './NavBar'
import Footer from './Footer'


const ShopCourses = () => {

  return (
        <div>
          <NavBar/>
          {/* PAGE TITLE
      ================================================== */}
          <header className="py-8 py-md-10" style={{backgroundImage: 'none'}}>
            <div className="container text-center py-xl-2">
              <h1 className="display-4 fw-semi-bold mb-0">Shop Cart</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-scroll justify-content-center">
                  <li className="breadcrumb-item">
                    <a className="text-gray-800" href="#">
                      Home
                    </a>
                  </li>
                  <li className="breadcrumb-item text-gray-800 active" aria-current="page">
                    Shop Cart
                  </li>
                </ol>
              </nav>
            </div>
            {/* Img */}
            <img className="d-none img-fluid" src="...html" alt="..." />
          </header>
          {/* SHOP CART
      ================================================== */}
          <div className="container pb-6 pb-xl-10">
            <div className="row">
              <div id="primary" className="content-area">
                <main id="main" className="site-main ">
                  <div className="page type-page status-publish hentry">
                    {/* .entry-header */}
                    <div className="entry-content">
                      <div className="woocommerce">
                        <form className="woocommerce-cart-form table-responsive" action="#" method="post">
                          <table className="shop_table shop_table_responsive cart woocommerce-cart-form__contents">
                            <thead>
                              <tr>
                                <th className="product-name">Product</th>
                                <th className="product-price">Price</th>
                                <th className="product-quantity">Quantity</th>
                                <th className="product-subtotal">Subtotal</th>
                                <th className="product-remove">&nbsp;</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="woocommerce-cart-form__cart-item cart_item">
                                <td className="product-name" data-title="Product">
                                  <div className="d-flex align-items-center">
                                    <a href="shop-single.html">
                                      <img src="../assets/img/products/product-25.jpg" className="attachment-shop_thumbnail size-shop_thumbnail wp-post-image" alt="" />
                                    </a>
                                    <div className="ms-6">
                                      <a href="shop-single.html">Album</a>
                                    </div>
                                  </div>
                                </td>
                                <td className="product-price" data-title="Price">
                                  <span className="woocommerce-Price-amount amount"><span className="woocommerce-Price-currencySymbol">$</span>298</span>
                                </td>
                                <td className="product-quantity" data-title="Quantity">
                                  {/* Quantity */}
                                  <div className="border rounded d-flex align-items-center">
                                    <input className="form-control form-control-sm border-0 quantity mw-70p px-2" min={0} name="quantity" defaultValue={1} type="number" />
                                    <div className="d-flex flex-column me-3">
                                      <button className="border-0 shadow-none quantity-plus font-size-10 p-0 bg-transparent outline-0 text-dark">
                                        <i className="fas fa-chevron-up" />
                                      </button>
                                      <button className="border-0 shadow-none quantity-minus font-size-10 p-0 bg-transparent outline-0 text-dark">
                                        <i className="fas fa-chevron-down" />
                                      </button>
                                    </div>
                                  </div>
                                  {/* End Quantity */}
                                </td>
                                <td className="product-subtotal" data-title="Total">
                                  <span className="woocommerce-Price-amount amount"><span className="woocommerce-Price-currencySymbol">$</span>1298</span>
                                </td>
                                <td className="product-remove">
                                  <a href="#" className="remove" aria-label="Remove this item">
                                    <i className="far fa-trash-alt text-secondary font-size-sm" />
                                  </a>
                                </td>
                              </tr>
                              <tr className="woocommerce-cart-form__cart-item cart_item">
                                <td className="product-name" data-title="Product">
                                  <div className="d-flex align-items-center">
                                    <a href="shop-single.html">
                                      <img src="../assets/img/products/product-27.jpg" className="attachment-shop_thumbnail size-shop_thumbnail wp-post-image" alt="" />
                                    </a>
                                    <div className="ms-6">
                                      <a href="shop-single.html">Hoodie</a>
                                    </div>
                                  </div>
                                </td>
                                <td className="product-price" data-title="Price">
                                  <span className="woocommerce-Price-amount amount"><span className="woocommerce-Price-currencySymbol">$</span>298</span>
                                </td>
                                <td className="product-quantity" data-title="Quantity">
                                  {/* Quantity */}
                                  <div className="border rounded d-flex align-items-center">
                                    <input className="form-control form-control-sm border-0 quantity mw-70p px-2" min={0} name="quantity" defaultValue={1} type="number" />
                                    <div className="d-flex flex-column me-3">
                                      <button className="border-0 shadow-none quantity-plus font-size-10 p-0 bg-transparent outline-0 text-dark">
                                        <i className="fas fa-chevron-up" />
                                      </button>
                                      <button className="border-0 shadow-none quantity-minus font-size-10 p-0 bg-transparent outline-0 text-dark">
                                        <i className="fas fa-chevron-down" />
                                      </button>
                                    </div>
                                  </div>
                                  {/* End Quantity */}
                                </td>
                                <td className="product-subtotal" data-title="Total">
                                  <span className="woocommerce-Price-amount amount"><span className="woocommerce-Price-currencySymbol">$</span>1298</span>
                                </td>
                                <td className="product-remove">
                                  <a href="#" className="remove" aria-label="Remove this item">
                                    <i className="far fa-trash-alt text-secondary font-size-sm" />
                                  </a>
                                </td>
                              </tr>
                              <tr className="woocommerce-cart-form__cart-item cart_item">
                                <td className="product-name" data-title="Product">
                                  <div className="d-flex align-items-center">
                                    <a href="shop-single.html">
                                      <img src="../assets/img/products/product-28.jpg" className="attachment-shop_thumbnail size-shop_thumbnail wp-post-image" alt="" />
                                    </a>
                                    <div className="ms-6">
                                      <a href="shop-single.html">Beanie</a>
                                    </div>
                                  </div>
                                </td>
                                <td className="product-price" data-title="Price">
                                  <span className="woocommerce-Price-amount amount"><span className="woocommerce-Price-currencySymbol">$</span>298</span>
                                </td>
                                <td className="product-quantity" data-title="Quantity">
                                  {/* Quantity */}
                                  <div className="border rounded d-flex align-items-center">
                                    <input className="form-control form-control-sm border-0 quantity mw-70p px-2" min={0} name="quantity" defaultValue={1} type="number" />
                                    <div className="d-flex flex-column me-3">
                                      <button className="border-0 shadow-none quantity-plus font-size-10 p-0 bg-transparent outline-0 text-dark">
                                        <i className="fas fa-chevron-up" />
                                      </button>
                                      <button className="border-0 shadow-none quantity-minus font-size-10 p-0 bg-transparent outline-0 text-dark">
                                        <i className="fas fa-chevron-down" />
                                      </button>
                                    </div>
                                  </div>
                                  {/* End Quantity */}
                                </td>
                                <td className="product-subtotal" data-title="Total">
                                  <span className="woocommerce-Price-amount amount"><span className="woocommerce-Price-currencySymbol">$</span>1298</span>
                                </td>
                                <td className="product-remove">
                                  <a href="#" className="remove" aria-label="Remove this item">
                                    <i className="far fa-trash-alt text-secondary font-size-sm" />
                                  </a>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={5} className="actions">
                                  <div className="coupon">
                                    <label htmlFor="coupon_code">Coupon:</label>
                                    <input type="text" name="coupon_code" className="input-text" id="coupon_code" defaultValue placeholder="Coupon code" autoComplete="off" /> <input type="submit" className="button" name="apply_coupon" defaultValue="Apply coupon" />
                                  </div>
                                  <input type="submit" className="button" name="update_cart" defaultValue="Update cart" />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </form>
                      </div>
                    </div>
                    {/* .entry-content */}
                  </div>
                </main>
              </div>
              <div id="secondary" className="sidebar" role="complementary">
                <div className="cart-collaterals">
                  <div className="cart_totals">
                    <h2>Cart totals</h2>
                    <table className="shop_table shop_table_responsive">
                      <tbody>
                        <tr className="cart-subtotal">
                          <th>Subtotal</th>
                          <td data-title="Subtotal"><span className="woocommerce-Price-amount amount"><span className="woocommerce-Price-currencySymbol">£</span>109.95</span></td>
                        </tr>
                        <tr className="order-total">
                          <th>Total</th>
                          <td data-title="Total"><strong><span className="woocommerce-Price-amount amount"><span className="woocommerce-Price-currencySymbol">£</span>109.95</span></strong> </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="wc-proceed-to-checkout">
                      <a href="shop-checkout.html" className="checkout-button button alt wc-forward">
                        Proceed to checkout
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* CALL ACTION
      ================================================== */}
          <section className="py-6 py-md-11 border-top border-bottom" data-jarallax data-speed=".8" style={{backgroundImage: 'url(../assets/img/illustrations/illustration-1.jpg)'}}>
            <div className="container text-center py-xl-4" data-aos="fade-up">
              <div className="row">
                <div className="col-xl-7 mx-auto">
                  <h1 className="text-capitalize">Subscribe our newsletter</h1>
                  <p className="text-capitalize font-size-lg mb-md-6 mb-4">Your download should start automatically, if not Click here. Should I give up, huh?.</p>
                  <div className="mx-md-8">
                    <form>
                      <div className="input-group">
                        <input type="text" className="form-control" placeholder="Enter your email" aria-label="Enter your email" aria-describedby="button-addon2" />
                        <div className="input-group-append">
                          <button className="btn btn-primary btn-sm-wide" type="button" id="button-addon2">Subscribe</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Footer/>
        </div>

)}
export default ShopCourses 