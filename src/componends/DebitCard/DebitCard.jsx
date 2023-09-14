import React, { useEffect, useState } from "react";
import "./DebitCard.css";
import { BiUser, BiCreditCardFront } from "react-icons/bi";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { AiOutlineLock } from "react-icons/ai";
import { FcSimCardChip } from "react-icons/fc";
import { CirclePicker, SliderPicker } from "react-color";

const DebitCard = ({ appColorBg }) => {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [showCardNum, setShowCardNum] = useState(false);

  const [isflip, setIsFlip] = useState(false);

  const [colour, setColour] = useState({
    backgroundColor: "#c1c1c1",
  });

  const [cardbgColor, setCardBGColor] = useState("#13f7d5c2");

  const handleColourChange = (color) => {
    setColour({ backgroundColor: color.hex });
    appColorBg(color.hex);
  };

  const handleCardbg = (c) => {
    setCardBGColor(c.hex);
  };

  const onhandleChange = (e) => {
    const { name, value } = e.target;

    console.log(typeof value);

    switch (name) {
      case "cardName":
        setErrors({
          ...errors,
          cardName:
            value.length > 31 ? "Name should be less then 32 characters" : "",
        });
        setCardName(value.length <= 32 ? value : cardName);
        break;
      case "cardNumber":
        if (value.length <= 16) {
          let val = value.replace(/[^0-9]/g, "");
          setCardNumber(val);
          // }
          val = val.match(/.{1,4}/g);
          setShowCardNum(val?.length > 0 ? val.join(" ") : "");
        }
        break;
      case "expiryMonth":
        if (value.length <= 2 && Number(value) <= 12) {
          setExpiryMonth(value.replace(/[^0-9]/g, ""));
        }
        break;
      case "expiryYear":
        if (value.length <= 4) {
          setExpiryYear(value.replace(/[^0-9]/g, ""));
        }
        break;
      case "cvv":
        if (value.length <= 3) {
          setCvv(value.replace(/[^0-9]/g, ""));
        }
        break;
      default:
        break;
    }
  };

  const handleCardNameKeyPress = (event) => {
    if (/\d/.test(event.key)) {
      event.preventDefault();
      setErrors({
        ...errors,
        cardName: "Enter alphabates only",
      });
    } else {
      setErrors({ ...errors, cardName: "" });
    }
  };

  const handleNumberKeyPress = (event) => {
    if (event.key === "e" || event.key === "+" || event.key === "-") {
      event.preventDefault();
    }
  };

  const handleflipper = () => {
    setIsFlip(true);
  };
  const handleblur = () => {
    setIsFlip(false);
  };

  // cvvInputfield.addEventListener("focus", () => {
  //   innerfliper.style.transform = "rotateY(180deg)";
  // });

  const PayNow = (e) => {
    e.preventDefault();
    const newerrors = {};

    if (cardName.trim() === "") {
      newerrors.cardName = "Card name is required";
    }

    if (cardNumber.trim() === "" || !/^\d{16}$/.test(cardNumber)) {
      newerrors.cardNumber = "Valid 16-digit card number is required";
    }

    if (expiryMonth.trim() === "" || !/^\d{1,2}$/.test(expiryMonth)) {
      newerrors.expiryMonth = "Valid expiry month (1-12) is required";
    }

    if (expiryYear.trim() === "" || !/^\d{4}$/.test(expiryYear)) {
      newerrors.expiryYear = "Valid expiry year (4 digits) is required";
    }

    if (cvv.trim() === "" || !/^\d{3}$/.test(cvv)) {
      newerrors.cvv = "Valid 3-digit CVV is required";
    }

    if (Object.keys(newerrors).length > 0) {
      setErrors(newerrors);
    } else {
      console.log("submitted successfully!");
      setSuccess("submitted successfully!");
    }
    setSubmit(true);
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      {/* {Object.keys(errors).length === 0 && submit ? (
          <span className="success">Successfully submitted ✓</span>
        ) : (
          ""
        )} */}

      <div className="row d-flex align-items-center">
        <div className=" col-xl-6 col-lg-6 col-md-12 col-12">
          <div className="d-flex flex-column mb-5 w-50 mx-auto">
            <div className="">
              <CirclePicker
                color={colour}
                onChangeComplete={handleColourChange}
                className="mx-auto mb-2"
              />
            </div>
            <div className="">
              <SliderPicker
                color={cardbgColor}
                onChangeComplete={handleCardbg}
              />
            </div>
          </div>

          <div className="card-holder-section m-auto">
            <div className={isflip ? "flip doFlip" : "flip"}>
              <div
                className="D-card border-none rounded-5 px-5 front"
                style={{
                  background: `radial-gradient(circle, rgb(186 186 186 / 87%) 0%, ${cardbgColor} 92%)`,
                }}
              >
                <div className="row pt-3 px-3">
                  <h4 className="visaword">VISA</h4>
                </div>
                <div className="row">
                  <div className="text-left">
                    <FcSimCardChip size="60" />
                  </div>
                </div>
                <div className="row">
                  <h2 className="card-number">{showCardNum}</h2>
                </div>
                <div className="row pt-4 d-flex justify-content-between align-items-start">
                  <div className="col-7">
                    <p className="title mb-2">Card Holder</p>
                    <span className="sub-info text-uppercase">{cardName}</span>
                  </div>
                  <div className="col-3 text-center">
                    <p className="title mb-2">Expiry</p>
                    <span className="sub-info">
                      {expiryMonth}/{expiryYear.slice(2, 4)}
                    </span>
                  </div>
                  {/* <div className="col-4 text-center">
                    <p className="title">CVV</p>
                    <span className="sub-info">{cvv}</span>
                  </div> */}
                </div>
              </div>
              <div
                className="D-card border-none rounded-5 overflow-hidden back"
                style={{
                  background: `radial-gradient(circle, rgb(186 186 186 / 87%) 0%, ${cardbgColor} 92%)`,
                }}
              >
                <div className="row">
                  <div className="col-12 bg-dark back-blackline"></div>
                  <div className="col-12">
                    <div className="cover-line d-flex justify-content-between align-items-center">
                      {cardName ? (
                        <div>
                          <p className="titlename mb-0">{cardName}</p>
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="cvv-box">
                        <span className="backsub-info">
                          {cvv ? (
                            <span className="backsub-info">{cvv}</span>
                          ) : (
                            <p className="title">CVV</p>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="shadowCard border-none rounded-5"></div>
            </div>
          </div>
        </div>
        <div className=" col-xl-6 col-lg-6 col-md-12 col-12">
          <div className="card-info-section vh-100 mx-auto d-flex align-items-center">
            <div className="d-flex flex-column justify-content-center">
              <h5 className="mb-5 first-title text-center">
                Payment Information
              </h5>
              <div className="row">
                <div className="col-md-12">
                  <div className="mb-5">
                    <div className="group mb-2">
                      <input
                        type="text"
                        required
                        name="cardName"
                        value={cardName}
                        onChange={onhandleChange}
                        onKeyPress={handleCardNameKeyPress}
                      />
                      <span className="highlight"></span>
                      <BiUser color="#fff" size="20" className="inputs-icons" />
                      <span className="bar"></span>
                      <label className=" text-uppercase">CardHolder Name</label>
                    </div>
                    {errors.cardName ? (
                      <div className="msg-box">
                        <p className="err">{errors.cardName}</p>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-5">
                    <div className="group mb-2">
                      <input
                        type="text"
                        required
                        name="cardNumber"
                        value={cardNumber}
                        onChange={onhandleChange}
                        onKeyPress={(e) => {
                          if (e.key === "e" || e.key === "-" || e.key === "+") {
                            e.preventDefault();
                          }
                        }}
                      />
                      <span className="highlight"></span>
                      <BiCreditCardFront
                        color="#fff"
                        size="20"
                        className="inputs-icons"
                      />
                      <span className="bar"></span>
                      <label className=" text-uppercase">Card Number</label>
                    </div>
                    {errors.cardNumber && !cardNumber ? (
                      <div className="msg-box">
                        <p className="err">{errors.cardNumber}</p>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="row d-flex justify-content-between">
                <div className="col-md-4">
                  <div className="group mb-2">
                    <input
                      type="text"
                      required
                      name="expiryMonth"
                      value={expiryMonth}
                      onChange={onhandleChange}
                      onKeyPress={handleNumberKeyPress}
                    />
                    <span className="highlight"></span>
                    <MdOutlineCalendarMonth
                      color="#fff"
                      size="20"
                      className="inputs-icons"
                    />
                    <span className="bar"></span>
                    <label className=" text-uppercase">Expiry month</label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="group mb-2">
                    <input
                      type="text"
                      required
                      name="expiryYear"
                      value={expiryYear}
                      onChange={onhandleChange}
                      onKeyPress={handleNumberKeyPress}
                    />
                    <span className="highlight"></span>
                    <MdOutlineCalendarMonth
                      color="#fff"
                      size="20"
                      className="inputs-icons"
                    />
                    <span className="bar"></span>
                    <label className=" text-uppercase">Expiry year</label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="group mb-2">
                    <input
                      type="text"
                      required
                      name="cvv"
                      value={cvv}
                      onChange={onhandleChange}
                      onKeyPress={handleNumberKeyPress}
                      id="cvvField"
                      onFocus={handleflipper}
                      onBlur={handleblur}
                    />
                    <span className="highlight"></span>
                    <AiOutlineLock
                      color="#fff"
                      size="20"
                      className="inputs-icons"
                    />
                    <span className="bar"></span>
                    <label className=" text-uppercase">CVV</label>
                  </div>
                </div>
              </div>
              {errors.expiryMonth && !expiryMonth ? (
                <div className="msg-box">
                  <p className="err">{errors.expiryMonth}</p>
                </div>
              ) : (
                ""
              )}
              {errors.expiryYear && !expiryYear ? (
                <div className="msg-box">
                  <p className="err">{errors.expiryYear}</p>
                </div>
              ) : (
                ""
              )}
              {errors.cvv && !cvv ? (
                <div className="msg-box">
                  <p className="err">{errors.cvv}</p>
                </div>
              ) : (
                ""
              )}

              <div className="row">
                <div className="Amountpay d-flex justify-content-center align-items-center">
                  {/* <div className="d-flex align-items-center">
                    <h5 className="pe-3 mb-0">Payment Amount:</h5>
                    <h4 className="mb-0">1000 &#x20B9;</h4>
                  </div> */}

                  <button className="btn btn-pay mt-3" onClick={PayNow}>
                    PAY
                  </button>
                </div>
              </div>
              {success ? (
                <div className="row">
                  <span className="success">Successfully Submitted ✓</span>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebitCard;
