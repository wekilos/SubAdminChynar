import React, { useRef } from "react";
import "antd/dist/antd.css";
import { Button } from "antd";
import ReactToPrint from "react-to-print";
import { BASE_URL } from "../utils/axiosIntance";

export default function PrintComponent(props) {
  let componentRef = useRef();
  console.log(props.maglumat);
  return (
    <>
      <div id="print_component">
        {/* button to trigger printing of target component */}
        <ReactToPrint
          copyStyles={true}
          trigger={() => (
            <Button
              style={{ margin: "10px auto" }}
              type="primary"
              shape="round"
            >
              Print!
            </Button>
          )}
          content={() => componentRef}
        />

        {/* component to be printed */}
        <div style={{ display: "none" }}>
          <ComponentToPrint
            ref={(el) => (componentRef = el)}
            maglumat={props.maglumat}
            sum={props.sum}
            valyuta={props.valyuta}
          />
        </div>
      </div>
    </>
  );
}

// component to be printed
class ComponentToPrint extends React.Component {
  render() {
    return (
      <div
        style={{
          width: "100%",
          padding: "2%",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <div
          style={{
            // width: "44%",
            maxWidth: "44%",
            fontSize: "14px",
          }}
        >
          <table style={{ width: "100%" }}>
            <tr className="modalLi" key={`sany`}>
              <td>
                {" "}
                <img
                  style={{ height: "50px", objectfit: "contain" }}
                  src={BASE_URL + "/" + this?.props?.maglumat?.Market.surat}
                  alt="logo"
                />
                <span
                  style={{
                    marginLeft: "20px",
                    fontSize: "26px",
                    color: "orange",
                  }}
                >
                  {this?.props?.maglumat?.Market?.name_tm}
                </span>
              </td>
            </tr>
            <tr>
              <td style={{ height: "20px" }}></td>
            </tr>
            <tr className="modalLi" key={`sany`}>
              <td> Telefon: +{this.props?.maglumat?.Market?.tel}</td>
            </tr>
            <tr className="modalLi" key={`sany`}>
              <td> IMO: +{this.props?.maglumat?.Market?.tel}</td>
            </tr>
            <tr className="modalLi" key={`sany`}>
              <td> Salgy: {this.props?.maglumat?.Market?.addres_tm}</td>
            </tr>
            <tr className="modalLi" key={`sany`}>
              <td>
                {" "}
                Düşündiriş: {this.props?.maglumat?.Market?.description_tm}
              </td>
            </tr>
          </table>

          <hr></hr>
          <table style={{ width: "100%" }}>
            <tr className="modalLi" key={`sany`}>
              <td> Ady:</td>
              <td style={{ fontWeight: "600" }}>
                {this.props?.maglumat?.Address?.rec_name}
              </td>
            </tr>
            <tr className="modalLi" key={`sany`}>
              <td> Telefon No:</td>
              <td style={{ fontWeight: "600" }}>
                {this.props?.maglumat?.Address?.rec_number}{" "}
              </td>
            </tr>
            <tr className="modalLi" key={`sany`}>
              <td> Salgysy:</td>
              <td style={{ fontWeight: "600" }}>
                {this.props?.maglumat?.Address?.rec_address}{" "}
              </td>
            </tr>
            <tr className="modalLi" key={`sany`}>
              <td> Sargyt edilen senesi:</td>
              <td style={{ fontWeight: "600" }}>
                {this.props?.maglumat?.createdAt.slice(0, 10)} <br></br>
                {this.props?.maglumat?.createdAt.slice(11, 19)}
              </td>
            </tr>
            <tr className="modalLi" key={`sany`}>
              <td> Eltip berme wagty:</td>
              <td style={{ fontWeight: "600" }}>
                {/* { this.props.maglumat.delivery_time_status=="1" && "Şu gün "+ (  this.props.maglumat.Market.dastawkaStartI)+"-"+(   this.props.maglumat.Market.dastawkaEndI)}
                              { this.props.maglumat.delivery_time_status=="2" && "Şu gün "+ ( this.props.maglumat.Market.dastawkaStartII)+"-"+(   this.props.maglumat.Market.dastawkaEndII)}

                              { this.props.maglumat.delivery_time_status=="3" && "Ertir"+ ( this.props.maglumat.Market.dastawkaStartI)+"-"+(   this.props.maglumat.Market.dastawkaEndI)}
                              {this.props.maglumat.delivery_time_status=="4" && "Ertir "+ (  this.props.maglumat.Market.dastawkaStartII)+"-"+(   this.props.maglumat.Market.dastawkaEndII)}
                               */}
                {this.props?.maglumat?.Market?.MarketDeleiveries?.map(
                  (item) => {
                    return (
                      item?.id == this.props?.maglumat?.delivery_time_status &&
                      item?.description_tm
                    );
                  }
                )}
              </td>
            </tr>
            <tr className="modalLi" key={`sany`}>
              <td> Töleg şekili :</td>
              <td style={{ fontWeight: "600" }}>
                {this.props?.maglumat?.is_cash == true
                  ? "Nagt"
                  : "Toleg Terminal"}
              </td>
            </tr>
            <tr className="modalLi" key={`sany`}>
              <td> Sargyt No: </td>
              <td style={{ fontWeight: "600" }}>{this.props?.maglumat?.id} </td>
            </tr>
          </table>
          {this.props?.maglumat && (
            <table
              style={{
                width: "100%",
                marginTop: "20px",
                borderCollapse: "collapse",
                border: "1px solid grey",
              }}
              border="1"
              className="goshmacha--ul"
            >
              <tr className="modalLi" key={"er"}>
                <td key={"erAdy"}>Ady </td>
                <td
                  key={"erMukdar"}
                  style={{ textAlign: "center", padding: "5px" }}
                  className="center"
                >
                  Mukdar{" "}
                </td>
                <td
                  key={"erKody"}
                  style={{ textAlign: "center", padding: "5px" }}
                  className="center"
                >
                  Kody{" "}
                </td>
                <td
                  key={"erBaha"}
                  style={{ textAlign: "center", padding: "5px" }}
                  className="center"
                >
                  Baha{" "}
                </td>
                <td
                  key={"erJemi"}
                  style={{ textAlign: "center", padding: "5px" }}
                  className="center"
                >
                  Jemi
                </td>
              </tr>

              {this.props?.maglumat &&
                this.props?.maglumat?.OrderedProducts &&
                this.props?.maglumat?.OrderedProducts?.map((product, i) => {
                  return (
                    <React.Fragment>
                      <tr className="modalLi" key={`tolega${i}`}>
                        <td>{product?.Product?.name_tm} </td>
                        <td style={{ textAlign: "center", padding: "5px" }}>
                          {product?.amount} {product?.Product?.Unit.name_tm}
                        </td>
                        <td style={{ textAlign: "center", padding: "5px" }}>
                          {product?.ProductId}{" "}
                        </td>
                        <td style={{ textAlign: "center", padding: "5px" }}>
                          {product?.Product?.sale_price
                            ? product?.Product?.is_valyuta_price == true
                              ? (
                                  product?.Product?.sale_price *
                                  this.props.valyuta
                                ).toFixed(2)
                              : product?.Product?.sale_price
                            : product?.Product?.is_valyuta_price == true
                            ? (
                                product?.Product?.price * this.props?.valyuta
                              ).toFixed(2)
                            : product?.Product?.price}{" "}
                        </td>
                        <td style={{ textAlign: "center", padding: "5px" }}>
                          {product?.Product?.sale_price
                            ? product?.Product?.is_valyuta_price == true
                              ? (
                                  product?.Product?.sale_price *
                                  this.props.valyuta *
                                  product.amount
                                ).toFixed(2)
                              : product?.Product?.sale_price * product?.amount
                            : product?.Product?.is_valyuta_price == true
                            ? (
                                product?.Product?.price *
                                this.props?.valyuta *
                                product?.amount
                              ).toFixed(2)
                            : product?.Product?.price * product.amount}
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })}
              <tr key={"erTrobshijemi"}>
                <td
                  colSpan={4}
                  style={{ textAlign: "right", marginRight: "10px" }}
                >
                  Jemi:
                </td>
                <td style={{ textAlign: "center", padding: "5px" }}>
                  {this.props?.sum && this.props?.sum}
                </td>
              </tr>
              <tr key={"dastawkatr"}>
                <td
                  colSpan={4}
                  style={{ textAlign: "right", marginRight: "10px" }}
                >
                  Dastawka:
                </td>
                <td style={{ textAlign: "center", padding: "5px" }}>
                  {" "}
                  {this.props.maglumat.Market &&
                    this.props?.maglumat?.Market?.MarketDeleiveries?.map(
                      (item) => {
                        return (
                          item.id ==
                            this.props?.maglumat?.delivery_time_status &&
                          item.price
                        );
                      }
                    )}
                </td>
              </tr>
              <tr key={"dastawkatrobshibaha"}>
                <td
                  colSpan={4}
                  style={{
                    textAlign: "right",
                    marginRight: "10px",
                    fontWeight: "bold",
                  }}
                >
                  Umumy Hasap:
                </td>
                <td
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    padding: "5px",
                  }}
                >
                  {this.props.maglumat.Market &&
                    this.props?.maglumat?.Market?.MarketDeleiveries?.map(
                      (item) => {
                        return (
                          item.id ==
                            this.props?.maglumat?.delivery_time_status &&
                          item?.price + this.props?.sum
                        );
                      }
                    )}
                </td>
              </tr>
            </table>
          )}
        </div>

        <div
          style={{
            // width: "44%",
            maxWidth: "44%",
            // margin: "3% 0% 1% 3%",
            fontSize: "14px",
          }}
        >
          <table style={{ width: "100%" }}>
            <tr className="modalLi" key={`sany`}>
              <td>
                {" "}
                <img
                  style={{ height: "50px", objectfit: "contain" }}
                  src={BASE_URL + "/" + this.props?.maglumat?.Market?.surat}
                  alt="logo"
                />
                <span
                  style={{
                    marginLeft: "20px",
                    fontSize: "26px",
                    color: "orange",
                  }}
                >
                  {this.props?.maglumat?.Market?.name_tm}
                </span>
              </td>
            </tr>
            <tr>
              <td style={{ height: "20px" }}></td>
            </tr>
            <tr className="modalLi" key={`sany`}>
              <td> Telefon: +{this.props?.maglumat?.Market?.tel}</td>
            </tr>
            <tr className="modalLi" key={`sany`}>
              <td> IMO: +{this.props?.maglumat?.Market?.tel}</td>
            </tr>
            <tr className="modalLi" key={`sany`}>
              <td> Salgy: {this.props?.maglumat?.Market?.addres_tm}</td>
            </tr>
            <tr className="modalLi" key={`sany`}>
              <td>
                {" "}
                Düşündiriş: {this.props?.maglumat?.Market?.description_tm}
              </td>
            </tr>
          </table>

          <hr></hr>
          <table style={{ width: "100%" }}>
            <tr className="modalLi" key={`sany`}>
              <td> Ady:</td>
              <td style={{ fontWeight: "600" }}>
                {this.props?.maglumat?.Address?.rec_name}
              </td>
            </tr>
            <tr className="modalLi" key={`sany`}>
              <td> Telefon No:</td>
              <td style={{ fontWeight: "600" }}>
                {this.props?.maglumat?.Address?.rec_number}{" "}
              </td>
            </tr>
            <tr className="modalLi" key={`sany`}>
              <td> Salgysy:</td>
              <td style={{ fontWeight: "600" }}>
                {this.props?.maglumat?.Address?.rec_address}{" "}
              </td>
            </tr>
            <tr className="modalLi" key={`sany`}>
              <td> Sargyt edilen senesi:</td>
              <td style={{ fontWeight: "600" }}>
                {this.props?.maglumat?.createdAt.slice(0, 10)} <br></br>
                {this.props?.maglumat?.createdAt.slice(11, 19)}
              </td>
            </tr>
            <tr className="modalLi" key={`sany`}>
              <td> Eltip berme wagty:</td>
              <td style={{ fontWeight: "600" }}>
                {/* { this.props.maglumat.delivery_time_status=="1" && "Şu gün "+ (  this.props.maglumat.Market.dastawkaStartI)+"-"+(   this.props.maglumat.Market.dastawkaEndI)}
                              { this.props.maglumat.delivery_time_status=="2" && "Şu gün "+ ( this.props.maglumat.Market.dastawkaStartII)+"-"+(   this.props.maglumat.Market.dastawkaEndII)}

                              { this.props.maglumat.delivery_time_status=="3" && "Ertir"+ ( this.props.maglumat.Market.dastawkaStartI)+"-"+(   this.props.maglumat.Market.dastawkaEndI)}
                              {this.props.maglumat.delivery_time_status=="4" && "Ertir "+ (  this.props.maglumat.Market.dastawkaStartII)+"-"+(   this.props.maglumat.Market.dastawkaEndII)}
                               */}
                {this.props?.maglumat?.Market?.MarketDeleiveries?.map(
                  (item) => {
                    return (
                      item.id == this.props?.maglumat?.delivery_time_status &&
                      item.description_tm
                    );
                  }
                )}
              </td>
            </tr>
            <tr className="modalLi" key={`sany`}>
              <td> Töleg şekili :</td>
              <td style={{ fontWeight: "600" }}>
                {this.props?.maglumat?.is_cash == true
                  ? "Nagt"
                  : "Toleg Terminal"}
              </td>
            </tr>
            <tr className="modalLi" key={`sany`}>
              <td> Sargyt No: </td>
              <td style={{ fontWeight: "600" }}>{this.props?.maglumat?.id} </td>
            </tr>
          </table>
          {this.props?.maglumat && (
            <table
              style={{
                width: "100%",
                marginTop: "20px",
                borderCollapse: "collapse",
                border: "1px solid grey",
              }}
              border="1"
              className="goshmacha--ul"
            >
              <tr className="modalLi" key={"er"}>
                <td key={"erAdy"}>Ady </td>
                <td
                  key={"erMukdar"}
                  style={{ textAlign: "center", padding: "5px" }}
                  className="center"
                >
                  Mukdar{" "}
                </td>
                <td
                  key={"erKody"}
                  style={{ textAlign: "center", padding: "5px" }}
                  className="center"
                >
                  Kody{" "}
                </td>
                <td
                  key={"erBaha"}
                  style={{ textAlign: "center", padding: "5px" }}
                  className="center"
                >
                  Baha{" "}
                </td>
                <td
                  key={"erJemi"}
                  style={{ textAlign: "center", padding: "5px" }}
                  className="center"
                >
                  Jemi
                </td>
              </tr>

              {this.props?.maglumat &&
                this.props?.maglumat?.OrderedProducts &&
                this.props?.maglumat?.OrderedProducts?.map((product, i) => {
                  return (
                    <React.Fragment>
                      <tr className="modalLi" key={`tolega${i}`}>
                        <td>{product?.Product?.name_tm} </td>
                        <td style={{ textAlign: "center", padding: "5px" }}>
                          {product.amount} {product?.Product?.Unit?.name_tm}
                        </td>
                        <td style={{ textAlign: "center", padding: "5px" }}>
                          {product.ProductId}{" "}
                        </td>
                        <td style={{ textAlign: "center", padding: "5px" }}>
                          {product?.Product?.sale_price
                            ? product?.Product?.is_valyuta_price == true
                              ? (
                                  product?.Product?.sale_price *
                                  this.props?.valyuta
                                ).toFixed(2)
                              : product?.Product?.sale_price
                            : product?.Product?.is_valyuta_price == true
                            ? (
                                product?.Product?.price * this.props?.valyuta
                              ).toFixed(2)
                            : product?.Product?.price}{" "}
                        </td>
                        <td style={{ textAlign: "center", padding: "5px" }}>
                          {product?.Product?.sale_price
                            ? product?.Product?.is_valyuta_price == true
                              ? (
                                  product?.Product?.sale_price *
                                  this.props?.valyuta *
                                  product?.amount
                                ).toFixed(2)
                              : product?.Product?.sale_price * product?.amount
                            : product?.Product?.is_valyuta_price == true
                            ? (
                                product?.Product?.price *
                                this.props?.valyuta *
                                product?.amount
                              ).toFixed(2)
                            : product?.Product?.price * product?.amount}
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })}
              <tr key={"erTrobshijemi"}>
                <td
                  colSpan={4}
                  style={{ textAlign: "right", marginRight: "10px" }}
                >
                  Jemi:
                </td>
                <td style={{ textAlign: "center", padding: "5px" }}>
                  {this.props?.sum && this.props?.sum}
                </td>
              </tr>
              <tr key={"dastawkatr"}>
                <td
                  colSpan={4}
                  style={{ textAlign: "right", marginRight: "10px" }}
                >
                  Dastawka:
                </td>
                <td style={{ textAlign: "center", padding: "5px" }}>
                  {" "}
                  {this.props?.maglumat?.Market &&
                    this.props?.maglumat?.Market?.MarketDeleiveries?.map(
                      (item) => {
                        return (
                          item.id ==
                            this.props?.maglumat?.delivery_time_status &&
                          item?.price
                        );
                      }
                    )}
                </td>
              </tr>
              <tr key={"dastawkatrobshibaha"}>
                <td
                  colSpan={4}
                  style={{
                    textAlign: "right",
                    marginRight: "10px",
                    fontWeight: "bold",
                  }}
                >
                  Umumy Hasap:
                </td>
                <td
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    padding: "5px",
                  }}
                >
                  {this.props.maglumat.Market &&
                    this.props?.maglumat?.Market?.MarketDeleiveries?.map(
                      (item) => {
                        return (
                          item.id ==
                            this.props?.maglumat?.delivery_time_status &&
                          item?.price + this.props?.sum
                        );
                      }
                    )}
                </td>
              </tr>
            </table>
          )}
        </div>
      </div>
    );
  }
}
