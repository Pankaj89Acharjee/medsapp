export  const categories = [
    { 
        name: "Analgesics" ,
        image:'https://images.unsplash.com/photo-1648769244858-6e20b5999a6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=711&q=80'
        
    },

    { 
        name: "Antipiretics", 
        image: 'https://images.unsplash.com/photo-1648699341396-b44bff6b488b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    
    },
  
    { 
        name: "AntiBiotics" ,
        image: 'https://images.unsplash.com/photo-1648699341396-b44bff6b488b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    
    },
  
    { 
        name: "Ointment" ,
        image: 'https://images.unsplash.com/photo-1648699341396-b44bff6b488b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    
    },
  
    { 
        name: "Lotions", 
        image: 'https://images.unsplash.com/photo-1648699341396-b44bff6b488b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    
    },
    { 
        name: "BabyFood" ,
    
        image: 'https://images.unsplash.com/photo-1648699341396-b44bff6b488b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    },
    { 
        name: "Vitamins" ,
        image: 'https://images.unsplash.com/photo-1648699341396-b44bff6b488b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    
    },
    { 
        name: "Supplementary" ,
        image: 'https://images.unsplash.com/photo-1648699341396-b44bff6b488b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    
    },
    { 
        name: "Masks" ,
        image: 'https://images.unsplash.com/photo-1648699341396-b44bff6b488b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    
    },

    { 
      name: "Antihypertensive" ,
      image: 'https://images.unsplash.com/photo-1648699341396-b44bff6b488b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  
  },

    { 
        name: "Other" ,
        image: 'https://images.unsplash.com/photo-1648699341396-b44bff6b488b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    },
  
  ]





/*FETCHING DATA FROM THE SANITY*/

export const userQuery = (userId) => {
    const query = `*[_type == "user" && _id == '${userId}']`;
    /*MEans => get me those data for type is user and where id is matched with the userId*/
    /*The query result is send to the Home.js in useEffect()*/
    return query;
}



export const searchQuery = (searchingfor) => {
    const query = `*[_type == "dashboard" && title match '${searchingfor}*' || category match '${searchingfor}*' || about match '${searchingfor}*'] {
        image {
            asset->{
                url
            }
        },

        _id,
        
        destination,
        
        postedBy->{
            _id,
            userName,
            image
        },

        save[] {
            _key,
            postedBy->{
                _id,
                userName,
                image
            },
        },

       
    }`;

    return query;
};

export const feedQuery = `*[_type == "dashboard"] | order(_createdAt desc) {
    image {
        asset->{
            url,
        }
    },

    _id,
    
    destination,
    
    postedBy->{
        _id,
        userName,
        image
    },

    save[]{
        _key,
        postedBy->{
            _id,
            userName,
            image
        },
    },

   

}`;

export const dashboardDetailQuery = (dashboardId) => {
    const query = `*[_type == "dashboard" && _id == '${dashboardId}']{
      image{
        asset->{
          url
        }
      },
      _id,
      title, 
      about,
      category,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
     save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
      comments[]{
        comment,
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      }
    }`;
    return query;
  };
  
  export const dashboardDetailMoreDashboardQuery = (dashboard) => {
    const query = `*[_type == "dashboard" && category == '${dashboard.category}' && _id != '${dashboard._id}' ]{
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
    return query;
  };


  export const userCreatedDashboardQuery = (userId) => {
    const query = `*[ _type == 'dashboard' && userId == '${userId}'] | order(_createdAt desc){
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
    return query;
  };
  
  export const userSavedDashboardQuery = (userId) => {
    const query = `*[_type == 'dashboard' && '${userId}' in save[].userId ] | order(_createdAt desc) {
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
    return query;
  };

  