import React from "react";
import { BsLinkedin, BsTwitter } from "react-icons/bs";

const Footer = () => (
  <div className="mt-24 flex justify-around">
    <div>
      <div className="mb-2">
        <a href="" target="_blank">
          <BsLinkedin />
        </a>
      </div>
      <div className="mb-2">
        <a href="" target="_blank">
          <BsTwitter />
        </a>
      </div>
    </div>

    <p className="flex dark:text-gray-200 text-gray-700">
      © 2023 All rights reserved by HuupAI.com
    </p>
  </div>
);

export default Footer;
