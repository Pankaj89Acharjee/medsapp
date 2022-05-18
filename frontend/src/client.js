/*SANITY CLIENT SIDE FILE*/
/*This section is used only when we use images a lot in our projets*/
import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID , /*It is found in SANITY, "npx sanity manage" Then it is stored in .env*/
    dataset: 'production',
    apiVersion: '2022-03-22',
    useCdn: true, /*useCdn is used to show images quickly to the users around the world*/
    token: process.env.REACT_APP_SANITY_TOKEN , /*It is found in SANITY, "npx sanity manage". Then it is stored in .env*/
        /*This is unsafe to disclose the token here, so we need to store it in .env
        Now as per DOCUMENTATION of react, constant in .env files should start with
        REACT_APP_xxxxxxxxx., otherwise it will not work*/
    
    
    
    ignoreBrowserTokenWarning: true, /*Showing Token Id in JAVASCRIPT is dangerous due to data leakage, but 
    its not working, so I have given this parameter to true so that
    no working is shown. I need to fix it as why .env constants that
    are written for REACT_SANITY_PROJECT_ID and REACT_SANITY_TOKEN
    not working*/
});

/*We need to create an image builder to store images
The below codes has no logic except by its own. It is found in the
documentation on the SANITY's web documentation. Anyone can use it as it
has the same format for all in the documentation*/

const builder = imageUrlBuilder(client); /*Used only for showing images*/
export const urlFor = (source) => builder.image(source); /*Used only for showing images*/





