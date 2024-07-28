import { type ReactNode } from "react";

function Page() {
  return (
    <div className="my-6 px-8 py-4 text-sm">
      We are Scoap ("we", "our", "us"). We’re committed to protecting and
      respecting your privacy. If you have questions about your personal
      information, please contact us.
      <div>
        <Heading>Privacy</Heading>
        <Part>
          <p>
            For your peace of mind, we would like to ensure that under no
            circumstances will your email or personal information be shared with
            or distributed to anyone without your explicit consent. Your privacy
            is extremely important to us. Please be mindful not to share your
            email publicly when posting, as the site allows user contributions
            and posts.
          </p>
          <p>
            Joining only requires an email address, which serves as the only
            unique & reliable identifier for our users. We ask for no other
            identifiers. You are permitted to change your “display name” at any
            time; however, your login will always be your original registered
            email. You are not encouraged to use your real name, nor submit any
            other personal information, address, or phone number.
          </p>
          {/* <p>
            We do not know your password. It is stored in an encrypted hash. You
            may reset your password anytime, and we have recently removed the
            restriction of forcing very strong passwords when resetting. Once
            logged in, the account/settings page allows you to change your
            password.
          </p> */}
          <p>
            Users may voluntarily enter their city (or country) on their profile
            card to let other users know where they are located – purely for
            interest's sake and support better for video's audio language and
            subtitle language. It is beneficial to know when someone is from
            another country, enabling us to translate our communications into
            their native language. We strongly encourage an international
            community, as we are multilingual ourselves.
          </p>
          {/* <p>
            Naturally, some basic and general information (such as browser type,
            device, and IP address, etc.) is occasionally logged along with any
            submissions for visitor & statistic purposes. These logs are
            essential for gaining a general understanding of our audience and
            assist in debugging, depending on the browser/device you’re using.
          </p> */}
          <p>
            However, it’s important to note that in specific circumstances,
            particularly in compliance with our CSAM policy or when legally
            required, we may be obligated to provide certain information to
            authorities. We take our legal responsibilities seriously while
            striving to protect your privacy to the fullest extent possible.
          </p>
        </Part>
      </div>
      {/* <div>
        <Heading>Data Retention Policy</Heading>
        <p>
          We retain your personal information for a period of 50 days to provide
          you with our services. After this period, personal data is securely
          deleted from our systems unless we are obligated to retain it longer
          for legal reasons, particularly in relation to our CSAM policy. Our
          retention policy is designed to respect your privacy while ensuring we
          meet our legal and ethical responsibilities.
        </p>
      </div> */}
      <div>
        <Heading>Forum Registration</Heading>
        <p>
          Registration is necessary to make a room and post in our site. A
          registration form should be filled out completely with your desired
          username, password, and email address. Your email address will be used
          to verify your membership and contact you about forum-related
          concerns. We process and store the information collected on this
          website securely and in accordance with applicable privacy laws. We do
          not share any personally identifying information with outside third
          parties without your consent, except as required by law.
        </p>
      </div>
      {/* <div>
        <Heading>Forum User Information</Heading>
        <p>
          If you are a forum member, please be aware that when you share or post
          personally identifying information, that information can be seen,
          stored, or utilized by other forum members whom you choose to share
          the information with. This may result in you receiving unsolicited
          messages and other forms of communication, depending on the
          information you shared. Scoap will not be responsible for
          personally identifying information that you share or post in the
          forum.
        </p>
      </div> */}
      <div>
        <Heading>Log Files</Heading>
        <p>
          Log files contain information that is usually made available by your
          web browser and is stored on our web server. This non-personally
          identifying information includes the following: browser type, language
          preference, referring site, and the date and time of every page
          request. Just like most other sites, we collect this information to
          have a better understanding of how our visitors use our website, to be
          able to generate reports on the trends relevant to the usage of our
          website, help with website administration, analyze user activities on
          the site, and collect information about our user base in general. We
          do not link the information contained in these log files to personally
          identifying information, and we will never distribute them to outside
          third parties.
        </p>
      </div>
      <div>
        <Heading>What Information We Collect</Heading>
        <p>
          When using forums provided by Scoap, we may require some or all of the
          following information: email address Internet Protocol (IP) address
          geographical location browser type and version operating system
          referral source length of visit, page views, website navigation, and
          any other related browsing activity Cookies and Web Beacons A cookie
          is a small text file that a website stores on your computer. This file
          contains information that your browser provides to the website each
          time you return. Cookies are used for record-keeping purposes. A web
          beacon is a transparent graphical image that serves to monitor your
          interaction with a website. This, along with cookies and log files,
          provides us with analytical information that we can use to improve
          website performance and user experience in general. We do not link
          this information to personally identifying information, nor do we give
          this information to outside third parties. This privacy statement
          regarding the use of cookies and web beacons is only applicable to the
          Scoap website. We have a detailed cookie policy and more information
          about the cookies that we set on this page.
        </p>
      </div>
      {/* <div>
        <Heading>Third Party Ads</Heading>
        <p>
          Our advertising partners may use cookies and web beacons in the ads
          that they serve on our website. The use of such technologies will
          enable the advertiser to store information about your web surfing
          interests, so that they can show you targeted advertisements that they
          believe will interest you the most. Our Privacy Policy does not cover
          the use of cookies and web beacons in the ads of our third-party
          advertisers.
        </p>
      </div> */}
      <div>
        <Heading>Managing Cookies</Heading>
        <p>
          If you do not wish to enable cookies, simply adjust your browser
          settings before using our website and turn off cookies for Scoap or
          our third-party advertisers. Bear in mind, however, that disabling
          cookies may affect how our site will function for you (e.g., being
          unable to log in).
        </p>
      </div>
      <div>
        <Heading>Links to Other Sites</Heading>
        <p>
          Our website contains links leading to other websites that are not
          owned or managed by us. Because we are not responsible for how these
          sites handle your privacy, we encourage you to check out the Privacy
          Policies of those other websites before giving out your personal
          information.
        </p>
      </div>
      <div>
        <Heading>Keeping Your Data Secure</Heading>
        <p>
          We are committed to ensuring that any information you provide to us is
          secure. In order to prevent unauthorized access or disclosure, we have
          put in place suitable measures and procedures to safeguard and secure
          the information that we collect.
        </p>
      </div>
      <div>
        <Heading>Controlling Your Personal Information</Heading>
        <p>
          When using the Scoap rooms, you may choose to limit public viewing of
          applicable personal information through the settings located in the
          Privacy section of your account. Scoap will not sell, distribute, or
          lease your personal information to third parties. We may use your
          personal information to send you security information, updates, or
          other information pertaining to Scoap, or your account.
        </p>
      </div>
      <div>
        <Heading>Rights</Heading>
        <p>
          You have a right to access the personal data we hold about you or
          obtain a copy of it. To do so, please contact us. If you believe that
          the information we hold for you is incomplete or inaccurate, you may
          contact us to ask us to complete or correct that information. You also
          have the right to request the erasure of your personal data. Please
          contact us if you would like us to remove your personal data.
        </p>
      </div>
      <div>
        <Heading>Acceptance of This Policy</Heading>
        <p>
          Continued use of our site signifies your acceptance of this policy. If
          you do not accept the policy, then please do not use this site. When
          registering, we will further request your explicit acceptance of the
          privacy policy.
        </p>
      </div>
      <div>
        <Heading>Changes to This Policy</Heading>
        <p>
          We may make changes to this policy at any time. You may be asked to
          review and re-accept the information in this policy if it changes in
          the future. Last updated: April 22, 2024
        </p>
      </div>
    </div>
  );
}

function Heading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-4 text-lg font-semibold text-primary">{children}</h2>
  );
}

function Part({ children }: { children: ReactNode }) {
  return <div className="space-y-2">{children}</div>;
}

export default Page;
