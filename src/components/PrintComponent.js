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
      <div style={{ width: "45%", margin: "4% 0 3% 3%" }}>
        <h2 style={{ color: "green" }}>Sargytlar</h2>
        {this.props.maglumat && (
          <table style={{ width: "100%" }} border="1" className="goshmacha--ul">
            <tr
              className="modalLi"
              key={this.props.maglumat && this.props.maglumat.id}
            >
              <td>ID </td>
              <td>{this.props.maglumat && this.props.maglumat.id} </td>
            </tr>
            <tr
              className="modalLi"
              key={this.props.maglumat && this.props.maglumat.sany}
            >
              <td>Sany </td>
              <td>{this.props.maglumat && this.props.maglumat.sany} </td>
            </tr>
            <tr className="modalLi" key={this.props.maglumat && this.props.sum}>
              <td> Baha </td>
              <td style={{ fontWeight: "600" }}>
                {this.props.sum && this.props.sum}{" "}
              </td>
            </tr>
            <tr className="modalLi" key={this.props.maglumat && this.props.sum}>
              <td>Dastawka Baha </td>
              <td style={{ fontWeight: "600" }}>
                {this.props?.maglumat?.Market?.MarketDeleiveries.map((item) => {
                  if (item?.id == this?.props?.maglumat?.delivery_time_status) {
                    console.log(item.price);
                    return item?.price;
                  }
                })}
              </td>
            </tr>
            <tr className="modalLi" key={this.props.maglumat && this.props.sum}>
              <td>Umumy Baha </td>
              <td style={{ fontWeight: "600" }}>
                {this.props?.maglumat?.Market?.MarketDeleiveries.map((item) => {
                  if (item?.id == this?.props?.maglumat?.delivery_time_status) {
                    console.log(item.price);
                    return item?.price + +this.props.sum;
                  }
                })}
              </td>
            </tr>
            <tr className="modalLi" key="toleg">
              <td>Töleg görnüşi</td>
              <td>
                {this.props.maglumat &&
                  this.props.maglumat.is_cash &&
                  "Nagt töleg"}
                {this.props.maglumat &&
                  !this.props.maglumat.is_cash &&
                  "Kart bilen töleg"}{" "}
              </td>
            </tr>
            {this.props.maglumat &&
              this.props.maglumat.OrderedProducts &&
              this.props.maglumat.OrderedProducts.map((product, i) => {
                return (
                  <React.Fragment>
                    <tr className="modalLi" key={`toleg${i}`}>
                      <td>{i + 1}) Haryt No</td>
                      <td>{product.ProductId} </td>
                    </tr>
                    <tr className="modalLi" key={`tolega${i}`}>
                      <td>{i + 1}) Haryt Ady</td>
                      <td>{product?.Product?.name_tm} </td>
                    </tr>
                    <tr className="modalLi" key={`tolegd${i}`}>
                      <td>{i + 1}) Haryt Dushundirish</td>
                      <td>{product?.Product?.description_tm} </td>
                    </tr>
                    <tr className="modalLi" key={`tolegpu${i}`}>
                      <td>{i + 1}) Haryt ölçegi</td>
                      <td>{product?.Product?.Unit.name_tm} </td>
                    </tr>
                    <tr className="modalLi" key={`tolegp${i}`}>
                      <td>{i + 1}) Haryt baha</td>
                      <td>
                        {product?.Product?.is_valyuta_price == true
                          ? (
                              product?.Product?.price * this.props.valyuta
                            ).toFixed(2)
                          : product?.Product?.price}{" "}
                      </td>
                    </tr>
                    <tr className="modalLi" key={`tolegsp${i}`}>
                      <td>{i + 1}) Haryt skitga baha</td>
                      <td>
                        {product?.Product?.is_valyuta_price == true
                          ? (
                              product?.Product?.sale_price * this.props.valyuta
                            ).toFixed(2)
                          : product?.Product?.sale_price}{" "}
                      </td>
                    </tr>
                    <tr className="modalLi" key={`sany${i}`}>
                      <td>{i + 1}) Haryt Sany</td>
                      <td>{product.amount} </td>
                    </tr>
                    <tr className="modalLi" key={`surat${i}`}>
                      <td>
                        {i + 1}) {product.Product && product?.Product?.name_tm}
                      </td>
                      <img
                        src={
                          BASE_URL +
                          "/" +
                          `${product?.Product && product?.Product?.surat}`
                        }
                        style={{ width: "50px", height: "50px" }}
                        alt="Haryt Surat"
                      />
                    </tr>
                  </React.Fragment>
                );
              })}
            <tr className="modalLi" key={`sany`}>
              <td> Sargyt Eden</td>
              <td style={{ fontWeight: "600" }}>
                {this.props.maglumat.Address.rec_name}
              </td>
            </tr>
            <tr className="modalLi" key={`sany`}>
              <td> Sargyt Eden Nomury</td>
              <td style={{ fontWeight: "600" }}>
                {this.props.maglumat.Address.rec_number}{" "}
              </td>
            </tr>
            <tr className="modalLi" key={`sany`}>
              <td> Sargyt Eden Salgysy</td>
              <td style={{ fontWeight: "600" }}>
                {this.props.maglumat.Address.rec_address}{" "}
              </td>
            </tr>
          </table>
        )}
      </div>
    );
  }
}
