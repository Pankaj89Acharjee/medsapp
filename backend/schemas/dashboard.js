export default {
    name: 'dashboard',
    title: 'Dashboard',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },

        {
            name: 'about',
            title: 'About',
            type: 'string',
        },

        {
            name: 'destination',
            title: 'Destination',
            type: 'url',
        },

        {
            name: 'category',
            title: 'Category',
            type: 'string',
        },

        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true /*It is used for cropping the image according
                to the environment. That is it enables the to choose
                what areas to be cropped and what areas of the image should be
                left. It is done according to the screen size*/
            }
        },

        {
            name: 'userId',
            title: 'UserId',
            type: 'string',
        },

        {
            name: 'postedBy',
            title: 'PostedBy',
            type: 'postedBy', /*Sanity looks it as a reference of another
            document. postedBy is used as a reference here*/
        },

        {
            name: 'save',
            title: 'Save',
            type: 'array',
            of: [{ type: 'save'}]
        },

        {
            name: 'comments',
            title: 'Comments',
            type: 'array',
            of: [{ type: 'comment'}]
        },

        {
            name: 'medicineName',
            title: 'MedicineName',
            type: 'array',
            of: [{ type: 'medicineName'}]
        },               
        
    ]
}