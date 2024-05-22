import React from 'react';

const SupportAndHelp = () => {
  return (
    <div className="support-help-page w-full">
      <div className="container mx-auto bg-white p-8 rounded-lg ">
        <h1 className="text-2xl font-bold mb-6 text-center">Support & Help</h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions (FAQs)</h2>
          <div className="faq">
            <details className="mb-4">
              <summary className="font-semibold text cursor-pointer">How do I reset my password?</summary>
              <p className="mt-2 text-gray-700">To reset your password, click on the 'Forgot Password' link on the login page and follow the instructions. You will receive an email with a link to reset your password.</p>
            </details>
            <details className="mb-4">
              <summary className="font-semibold text cursor-pointer">How can I contact support?</summary>
              <p className="mt-2 text-gray-700">You can contact our support team by emailing superadmin@academiq.com or by calling (+20) 1221-777-963.</p>
            </details>
            <details className="mb-4">
              <summary className="font-semibold text cursor-pointer">Why can't I access my course?</summary>
              <p className="mt-2 text-gray-700">If you are having trouble accessing your course, please ensure that you are logged in with the correct credentials. If the issue persists, contact our support team for assistance.</p>
            </details>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <p className="text-gray-700 mb-2">For any inquiries or support, you can reach us at:</p>
          <p className="text-gray-700 mb-2">Email: <a href="mailto:superadmin@academiq.com" className="text-blue-600 underline">superadmin@academiq.com</a></p>
          <p className="text-gray-700">Phone: (+20) 1221-777-963</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Troubleshooting Tips</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li className="mb-2">Ensure you are using a supported browser. We recommend the latest versions of Chrome, Firefox, or Safari.</li>
            <li className="mb-2">Clear your browser cache and cookies regularly to ensure optimal performance.</li>
            <li className="mb-2">Disable any browser extensions that might interfere with the platform.</li>
            <li>If you encounter any issues, try refreshing the page or logging out and logging back in.</li>
          </ul>
        </section>

        {/* <section>
          <h2 className="text-xl font-semibold mb-4">Useful Resources</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li className="mb-2"><a href="/user-guide" className="text-blue-600 underline">User Guide</a></li>
            <li className="mb-2"><a href="/video-tutorials" className="text-blue-600 underline">Video Tutorials</a></li>
            <li className="mb-2"><a href="/community-forum" className="text-blue-600 underline">Community Forum</a></li>
            <li><a href="/privacy-policy" className="text-blue-600 underline">Privacy Policy</a></li>
          </ul>
        </section> */}
      </div>
    </div>
  );
};

export default SupportAndHelp;
