import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image3 from "../../assets/image/image3.png";
import Image4 from "../../assets/image/image4.png";

const ListCustomer = () => {
  const [bg, changeBGColor] = useState(1);

  return (
    <div className="mt-4">
      <Container className="ms-0">
        <Row>
          <Col className="d-flex justify-content-flex-start" style={{ borderRight: "2px solid #CDCDCD" }}>
            <div>
              <h4 style={{ fontSize: "24px", fontWeight: "600", color: "#173486", marginLeft: "70px" }}>All Customers</h4>
              <ListGroup as="ol" style={{ width: "580px" }}>
                <div>
                  <ListGroup.Item
                    as="li"
                    className="d-flex align-items-center"
                    onClick={() => changeBGColor(1)}
                    style={{
                      backgroundColor: bg === 1 ? "#EAF0FA" : "#FFF",
                      borderRight: "none",
                      borderLeft: "none",
                      height: "66px",
                    }}
                  >
                    <div className="ms-5">
                      <img src={Image3} alt="" width={40} />
                    </div>
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">Wayan Kulkas</div>
                      <div>
                        <a href="" style={{ textDecoration: "none", fontWeight: "500", color: "#173486" }}>
                          wayankulkas@gmail.com
                        </a>
                      </div>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faChevronRight} size="lg" style={{ color: "#173486", marginRight: "40px" }} />
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item
                    as="li"
                    className="d-flex align-items-center"
                    onClick={() => changeBGColor(2)}
                    style={{
                      backgroundColor: bg === 2 ? "#EAF0FA" : "#FFF",
                      borderRight: "none",
                      borderLeft: "none",
                      height: "66px",
                    }}
                  >
                    <div className="ms-5">
                      <img src={Image4} alt="" width={40} />
                    </div>
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">Alvin Wiraprathama</div>
                      <div>
                        <a href="" style={{ textDecoration: "none", fontWeight: "500", color: "#173486" }}>
                          wiraprathamaalvin@gmail.com
                        </a>
                      </div>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faChevronRight} size="lg" style={{ color: "#173486", marginRight: "40px" }} />
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item
                    as="li"
                    className="d-flex align-items-center"
                    onClick={() => changeBGColor(3)}
                    style={{
                      backgroundColor: bg === 3 ? "#EAF0FA" : "#FFF",
                      borderRight: "none",
                      borderLeft: "none",
                      height: "66px",
                    }}
                  >
                    <div className="ms-5">
                      <img src={Image4} alt="" width={40} />
                    </div>
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">Alvin Wiraprathama</div>
                      <div>
                        <a href="" style={{ textDecoration: "none", fontWeight: "500", color: "#173486" }}>
                          wiraprathamaalvin@gmail.com
                        </a>
                      </div>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faChevronRight} size="lg" style={{ color: "#173486", marginRight: "40px" }} />
                    </div>
                  </ListGroup.Item>{" "}
                  <ListGroup.Item
                    as="li"
                    className="d-flex align-items-center"
                    onClick={() => changeBGColor(4)}
                    style={{
                      backgroundColor: bg === 4 ? "#EAF0FA" : "#FFF",
                      borderRight: "none",
                      borderLeft: "none",
                      height: "66px",
                    }}
                  >
                    <div className="ms-5">
                      <img src={Image4} alt="" width={40} />
                    </div>
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">Alvin Wiraprathama</div>
                      <div>
                        <a href="" style={{ textDecoration: "none", fontWeight: "500", color: "#173486" }}>
                          wiraprathamaalvin@gmail.com
                        </a>
                      </div>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faChevronRight} size="lg" style={{ color: "#173486", marginRight: "40px" }} />
                    </div>
                  </ListGroup.Item>{" "}
                  <ListGroup.Item
                    as="li"
                    className="d-flex align-items-center"
                    onClick={() => changeBGColor(5)}
                    style={{
                      backgroundColor: bg === 5 ? "#EAF0FA" : "#FFF",
                      borderRight: "none",
                      borderLeft: "none",
                      height: "66px",
                    }}
                  >
                    <div className="ms-5">
                      <img src={Image4} alt="" width={40} />
                    </div>
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">Alvin Wiraprathama</div>
                      <div>
                        <a href="" style={{ textDecoration: "none", fontWeight: "500", color: "#173486" }}>
                          wiraprathamaalvin@gmail.com
                        </a>
                      </div>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faChevronRight} size="lg" style={{ color: "#173486", marginRight: "40px" }} />
                    </div>
                  </ListGroup.Item>{" "}
                  <ListGroup.Item
                    as="li"
                    className="d-flex align-items-center"
                    onClick={() => changeBGColor(6)}
                    style={{
                      backgroundColor: bg === 6 ? "#EAF0FA" : "#FFF",
                      borderRight: "none",
                      borderLeft: "none",
                      height: "66px",
                    }}
                  >
                    <div className="ms-5">
                      <img src={Image4} alt="" width={40} />
                    </div>
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">Alvin Wiraprathama</div>
                      <div>
                        <a href="" style={{ textDecoration: "none", fontWeight: "500", color: "#173486" }}>
                          wiraprathamaalvin@gmail.com
                        </a>
                      </div>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faChevronRight} size="lg" style={{ color: "#173486", marginRight: "40px" }} />
                    </div>
                  </ListGroup.Item>{" "}
                  <ListGroup.Item
                    as="li"
                    className="d-flex align-items-center"
                    onClick={() => changeBGColor(7)}
                    style={{
                      backgroundColor: bg === 7 ? "#EAF0FA" : "#FFF",
                      borderRight: "none",
                      borderLeft: "none",
                      height: "66px",
                    }}
                  >
                    <div className="ms-5">
                      <img src={Image4} alt="" width={40} />
                    </div>
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">Alvin Wiraprathama</div>
                      <div>
                        <a href="" style={{ textDecoration: "none", fontWeight: "500", color: "#173486" }}>
                          wiraprathamaalvin@gmail.com
                        </a>
                      </div>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faChevronRight} size="lg" style={{ color: "#173486", marginRight: "40px" }} />
                    </div>
                  </ListGroup.Item>{" "}
                  <ListGroup.Item
                    as="li"
                    className="d-flex align-items-center"
                    onClick={() => changeBGColor(8)}
                    style={{
                      backgroundColor: bg === 8 ? "#EAF0FA" : "#FFF",
                      borderRight: "none",
                      borderLeft: "none",
                      height: "66px",
                    }}
                  >
                    <div className="ms-5">
                      <img src={Image4} alt="" width={40} />
                    </div>
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">Alvin Wiraprathama</div>
                      <div>
                        <a href="" style={{ textDecoration: "none", fontWeight: "500", color: "#173486" }}>
                          wiraprathamaalvin@gmail.com
                        </a>
                      </div>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faChevronRight} size="lg" style={{ color: "#173486", marginRight: "40px" }} />
                    </div>
                  </ListGroup.Item>
                </div>
              </ListGroup>
            </div>
          </Col>
          <Col style={{ marginTop: "30px", width: "530px" }}>
            <div className="d-flex justify-content-flex-start" style={{ gap: "1rem", marginLeft: "63px" }}>
              <div>
                <img src={Image3} alt="" width={70} />
              </div>
              <div>
                <div className="fw-bold fs-4">Wayan Kulkas</div>
                <div>
                  <a href="" style={{ textDecoration: "none", fontWeight: "500", color: "#173486" }}>
                    wayankulkas@gmail.com
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h4 style={{ fontWeight: "600", color: "#173486", marginLeft: "63px" }}>Invoice History</h4>
              <ListGroup as="ol" style={{ width: "601px" }}>
                <div style={{ marginTop: "8px" }}>
                  <ListGroup.Item as="li" className="d-flex align-items-center" style={{ justifyContent: "space-between", height: "66px", borderRight: "none", borderLeft: "none" }}>
                    <div className="ms-5" style={{ fontWeight: "500", color: "#173486" }}>
                      <div style={{ paddingBottom: "5px" }}>INV-00341212</div>
                      <div>03 Dec 2022</div>
                    </div>
                    <div className="d-flex" style={{ flexDirection: "column", alignContent: "space-between" }}>
                      <div style={{ fontWeight: "600", fontSize: "14px", color: "#404040", paddingBottom: "5px", marginLeft: "30px" }}>Rp 2.200.000</div>
                      <div style={{ width: "154px", height: "25px", borderRadius: "20px", backgroundColor: "#ECF9F1" }}>
                        <div className="d-flex" style={{ marginTop: "3px", fontWeight: "600", fontSize: "12px", color: "#329059", justifyContent: "center" }}>
                          Success
                        </div>
                      </div>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" className="d-flex align-items-center" style={{ justifyContent: "space-between", height: "66px", borderRight: "none", borderLeft: "none" }}>
                    <div className="ms-5" style={{ fontWeight: "500", color: "#173486" }}>
                      <div style={{ paddingBottom: "5px" }}>INV-00341212</div>
                      <div>03 Dec 2022</div>
                    </div>
                    <div className="d-flex" style={{ flexDirection: "column", alignContent: "space-between" }}>
                      <div style={{ fontWeight: "600", fontSize: "14px", color: "#404040", paddingBottom: "5px", marginLeft: "30px" }}>Rp 2.200.000</div>
                      <div style={{ width: "154px", height: "25px", borderRadius: "20px", backgroundColor: "#FEF1E7" }}>
                        <div className="d-flex" style={{ marginTop: "3px", fontWeight: "600", fontSize: "12px", color: "#F57D15", justifyContent: "center" }}>
                          3 Days Left
                        </div>
                      </div>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" className="d-flex align-items-center" style={{ justifyContent: "space-between", height: "66px", borderRight: "none", borderLeft: "none" }}>
                    <div className="ms-5" style={{ fontWeight: "500", color: "#173486" }}>
                      <div style={{ paddingBottom: "5px" }}>INV-00341212</div>
                      <div>03 Dec 2022</div>
                    </div>
                    <div className="d-flex" style={{ flexDirection: "column", alignContent: "space-between" }}>
                      <div style={{ fontWeight: "600", fontSize: "14px", color: "#404040", paddingBottom: "5px", marginLeft: "30px" }}>Rp 2.200.000</div>
                      <div style={{ width: "154px", height: "25px", borderRadius: "20px", backgroundColor: "#ECF9F1" }}>
                        <div className="d-flex" style={{ marginTop: "3px", fontWeight: "600", fontSize: "12px", color: "#329059", justifyContent: "center" }}>
                          Success
                        </div>
                      </div>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" className="d-flex align-items-center" style={{ justifyContent: "space-between", height: "66px", borderRight: "none", borderLeft: "none" }}>
                    <div className="ms-5" style={{ fontWeight: "500", color: "#173486" }}>
                      <div style={{ paddingBottom: "5px" }}>INV-00341212</div>
                      <div>03 Dec 2022</div>
                    </div>
                    <div className="d-flex" style={{ flexDirection: "column", alignContent: "space-between" }}>
                      <div style={{ fontWeight: "600", fontSize: "14px", color: "#404040", paddingBottom: "5px", marginLeft: "30px" }}>Rp 2.200.000</div>
                      <div style={{ width: "154px", height: "25px", borderRadius: "20px", backgroundColor: "#ECF9F1" }}>
                        <div className="d-flex" style={{ marginTop: "3px", fontWeight: "600", fontSize: "12px", color: "#329059", justifyContent: "center" }}>
                          Success
                        </div>
                      </div>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" className="d-flex align-items-center" style={{ justifyContent: "space-between", height: "66px", borderRight: "none", borderLeft: "none" }}>
                    <div className="ms-5" style={{ fontWeight: "500", color: "#173486" }}>
                      <div style={{ paddingBottom: "5px" }}>INV-00341212</div>
                      <div>03 Dec 2022</div>
                    </div>
                    <div className="d-flex" style={{ flexDirection: "column", alignContent: "space-between" }}>
                      <div style={{ fontWeight: "600", fontSize: "14px", color: "#404040", paddingBottom: "5px", marginLeft: "30px" }}>Rp 2.200.000</div>
                      <div style={{ width: "154px", height: "25px", borderRadius: "20px", backgroundColor: "#ECF9F1" }}>
                        <div className="d-flex" style={{ marginTop: "3px", fontWeight: "600", fontSize: "12px", color: "#329059", justifyContent: "center" }}>
                          Success
                        </div>
                      </div>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" className="d-flex align-items-center" style={{ justifyContent: "space-between", height: "66px", borderRight: "none", borderLeft: "none" }}>
                    <div className="ms-5" style={{ fontWeight: "500", color: "#173486" }}>
                      <div style={{ paddingBottom: "5px" }}>INV-00341212</div>
                      <div>03 Dec 2022</div>
                    </div>
                    <div className="d-flex" style={{ flexDirection: "column", alignContent: "space-between" }}>
                      <div style={{ fontWeight: "600", fontSize: "14px", color: "#404040", paddingBottom: "5px", marginLeft: "30px" }}>Rp 2.200.000</div>
                      <div style={{ width: "154px", height: "25px", borderRadius: "20px", backgroundColor: "#ECF9F1" }}>
                        <div className="d-flex" style={{ marginTop: "3px", fontWeight: "600", fontSize: "12px", color: "#329059", justifyContent: "center" }}>
                          Success
                        </div>
                      </div>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" className="d-flex align-items-center" style={{ justifyContent: "space-between", height: "66px", borderRight: "none", borderLeft: "none" }}>
                    <div className="ms-5" style={{ fontWeight: "500", color: "#173486" }}>
                      <div style={{ paddingBottom: "5px" }}>INV-00341212</div>
                      <div>03 Dec 2022</div>
                    </div>
                    <div className="d-flex" style={{ flexDirection: "column", alignContent: "space-between", height: "66px" }}>
                      <div style={{ fontWeight: "600", fontSize: "14px", color: "#404040", paddingBottom: "5px", marginLeft: "30px" }}>Rp 2.200.000</div>
                      <div style={{ width: "154px", height: "25px", borderRadius: "20px", backgroundColor: "#ECF9F1" }}>
                        <div className="d-flex" style={{ marginTop: "3px", fontWeight: "600", fontSize: "12px", color: "#329059", justifyContent: "center" }}>
                          Success
                        </div>
                      </div>
                    </div>
                  </ListGroup.Item>
                </div>
              </ListGroup>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ListCustomer;
