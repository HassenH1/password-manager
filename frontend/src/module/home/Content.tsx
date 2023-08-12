import React from "react";

function Content() {
  return (
    <section className="container py-5">
      <div className="">
        <div className="text-center">
          <p
            style={{ fontFamily: "Concert One", fontSize: 40 }}
            className="my-0 "
          >
            Built with security in mind
          </p>
          <p style={{ fontSize: 25 }}>Focusing on better things!</p>
        </div>
        <div className="row mt-5">
          <div className="col-sm">
            <div className="text-center">
              <h3 className="" style={{ fontFamily: "Concert One" }}>
                Log in on the go{" "}
                <img
                  src="https://cdn1.iconfinder.com/data/icons/security-and-protection-2-1/128/54-512.png"
                  alt="login"
                  height={55}
                />
              </h3>
            </div>
            <p className="text-left px-5" style={{ fontSize: 20 }}>
              Login anytime and anywhere to instantly get access to your
              passwords Once you save a password in PM, you always have access
              to it when you need it.
            </p>
          </div>
          <div className="col-sm">
            <h3 className="text-center" style={{ fontFamily: "Concert One" }}>
              Generate Strong Passwords{" "}
              <img
                src="https://cdn-icons-png.flaticon.com/512/1803/1803612.png"
                alt="lock"
                height={55}
              />
            </h3>
            <p className="text-left px-5" style={{ fontSize: 20 }}>
              Built in password generator creates long, strong and randomized
              password that protects against hackings.
            </p>
          </div>
          {/* <div className="col-sm">One of three columns</div> */}
        </div>
      </div>
    </section>
  );
}

export default Content;
