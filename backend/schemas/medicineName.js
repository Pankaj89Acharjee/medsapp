export default {
    name: 'medicineName',
    title: 'MedicineName',
    type: 'document',
    fields: [
        {
            name: 'postedBy',
            title: 'PostedBy',
            type: 'postedBy',
        },

        {
            name: 'medName',
            title: 'MedName',
            type: 'string',
        },

        {
            name: 'medDescription',
            title: 'MedDescription',
            type: 'string',
        },

        {
            name: 'usedFor',
            title: 'UsedFor',
            type: 'string',
        },
    ]
}