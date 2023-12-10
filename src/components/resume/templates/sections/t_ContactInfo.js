// // import React from "react";

// // const contactSection = ({ data }) => {
// //     return (
// //         <div>
// //             <h1>{data.firstName} {data.lastName}</h1>
// //             <h3>{data.email}</h3>
// //             <h3>{data.phone}</h3>
// //             <h3>{data.city}, {data.state}</h3>
// //             <h3>{data.pronouns}</h3>
// //         </div>
// //     );
// // }
 
// // export default contactSection;

// import React from 'react';
// import SocialsSection from './t_Socials.js';


// const contactSection = ({ data }) => {
//   return (
//     <section className="contact-info-section">
//       <h1 className="name"> {data.lastName}</h1>
//       {data.socials ? (
//         <h3>
//           {data.location.city}, {data.location.state} | {data.phone} | {data.email}
//           <SocialsSection socials={data.socials} />
//         </h3>
//       ) : (
//         <h3>
//           {data.location.city}, {data.location.state} | {data.phone} | {data.email}
//         </h3>
//       )}
//       <div className="line-container">
//         <div className="bold-line"></div>
//       </div>
//     </section>
//   );
// };

// export default contactSection;


// import React from 'react';

// const contactSection = ({ contact }) => {
//   return (
//     <div>
//       <h1>{contact.firstName} {contact.lastName}</h1>
//       <h3>{contact.email}</h3>
//       <h3>{contact.phone}</h3>
//       <h3>{contact.location.city}, {contact.location.state}</h3>
//     </div>
//   );
// }

// export default contactSection;

import React from 'react';
import SocialsSection from './t_Socials.js';

const ContactSection = ({ contact, socialsData }) => {
  const renderContact = () => {
    const { location, phone, email } = contact;

    return (
      <div>
        <div>{`${location.city}, ${location.state}`}</div>
        <div>{phone}</div>
        <div>{email}</div>
      </div>
    );
  };

  const renderSocials = () => {
    if (!socialsData || !socialsData.profile || !Array.isArray(socialsData.profile)) {
      return null;
    }

    return (
      <div>
        {socialsData.profile.map((profile, index) => (
          <div key={index}>{`${profile.name}: ${profile.link}`}</div>
        ))}
      </div>
    );
  };


  return (
    <div>
      {renderContact()}
      {renderSocials()}
    </div>
  );
};

export default ContactSection;

