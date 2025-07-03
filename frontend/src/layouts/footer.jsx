import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 text-sm w-full px-6 py-10">
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-10">
        {/* Stack Overflow Column */}
        <div>
          <img
            src="https://cdn.sstatic.net/Img/home/seo-se-logo.png"
            alt="StackZone"
            className="h-6 mb-4"
          />
          <ul className="space-y-1">
            <li>Questions</li>
            <li>Help</li>
            <li>Chat</li>
          </ul>
        </div>

        {/* Products */}
        <div>
          <h3 className="font-bold mb-2">PRODUCTS</h3>
          <ul className="space-y-1">
            <li>Teams</li>
            <li>Advertising</li>
            <li>Talent</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-bold mb-2">COMPANY</h3>
          <ul className="space-y-1">
            <li>About</li>
            <li>Press</li>
            <li>Work Here</li>
            <li>Legal</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Contact Us</li>
            <li>Cookie Settings</li>
            <li>Cookie Policy</li>
          </ul>
        </div>

        {/* Network */}
        <div>
          <h3 className="font-bold mb-2">STACK EXCHANGE NETWORK</h3>
          <ul className="space-y-1">
            <li>Technology</li>
            <li>Culture & recreation</li>
            <li>Life & arts</li>
            <li>Science</li>
            <li>Professional</li>
            <li>Business</li>
            <li>API</li>
            <li>Data</li>
            <li>Blog</li>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>LinkedIn</li>
            <li>Instagram</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 text-xs text-gray-400 text-center">
        Site design / logo © 2025 Stack Exchange Inc; user contributions licensed under{" "}
        <a
          href="https://creativecommons.org/licenses/by-sa/4.0/"
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          CC BY-SA
        </a>{" "}
        . rev 2025.7.3.30716
      </div>
    </footer>
  );
};

export default Footer;
