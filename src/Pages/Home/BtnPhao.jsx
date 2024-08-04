//Style Import
import React, { useEffect, useState } from "react";
import InsertPhaoEPIRB from "../Cospas/InsertPhaoEPIRB";
import "./BtnPhao.css";
const BtnPhao = () => {
  const [openPhaoEPIRB, setOpenPhaoEPIRB] = useState(false);
  return (
    <>
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            zIndex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div class="container my-3 py-5">
            <div class="row justify-content-center">
              <div class="col-6 text-center">
                <div class="p-1">
                  <div class="text-grow" id="button">
                    <a href="#" class="btn btn-blue btn-bg-ocean" onClick={()=>setOpenPhaoEPIRB(true)}>
                      <p>Phao RPIRB</p>
                    </a>
                  </div>
                </div>
                {/* <div class="p-1">
                  <div class="text-grow" id="button">
                    <a href="#" class="btn btn-blue btn-bg-desert" onClick={()=>setOpenPhaoPLB(true)}>
                      <p>Phao PLB</p>
                    </a>
                  </div>
                </div>
                <div class="p-1">
                  <div class="text-grow" id="button">
                    <a href="#" class="btn btn-blue btn-bg-arctic" onClick={()=>setOpenPhaoELT(true)}>
                      <p>Phao ELT</p>
                    </a>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {openPhaoEPIRB ? (
        <InsertPhaoEPIRB
        openPhaoEPIRB={openPhaoEPIRB}
          closePhaoEPIRB={() => setOpenPhaoEPIRB(false)}
        />
      ) : null}
    </>
  );
};
export default BtnPhao;
