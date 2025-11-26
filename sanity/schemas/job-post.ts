import {defineField, defineType} from 'sanity'

export default defineType({
    name: 'jobPost',
    title: 'Job Post',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Job Title',
            type: 'string',
            validation: (Rule) => Rule.required().min(3),
        }),

        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {source: 'title', maxLength: 96},
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'department',
            title: 'Department',
            type: 'string',
            description: 'Team or department (e.g. Engineering, Design)',
        }),

        defineField({
            name: 'location',
            title: 'Location',
            type: 'string',
            description: 'City, country or remote status (e.g. Remote / Berlin)',
        }),

        defineField({
            name: 'remote',
            title: 'Remote',
            type: 'boolean',
            initialValue: true,
        }),

        defineField({
            name: 'jobType',
            title: 'Job Type',
            type: 'string',
            options: {
                list: [
                    {title: 'Full-time', value: 'full-time'},
                    {title: 'Part-time', value: 'part-time'},
                    {title: 'Contract', value: 'contract'},
                    {title: 'Internship', value: 'internship'},
                    {title: 'Temporary', value: 'temporary'},
                ],
            },
        }),

        defineField({
            name: 'experienceLevel',
            title: 'Experience Level',
            type: 'string',
            options: {
                list: [
                    {title: 'Junior', value: 'junior'},
                    {title: 'Mid', value: 'mid'},
                    {title: 'Senior', value: 'senior'},
                    {title: 'Lead', value: 'lead'},
                ],
            },
        }),

        defineField({
            name: 'postedAt',
            title: 'Posted At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'closingDate',
            title: 'Closing Date',
            type: 'date',
        }),

        defineField({
            name: 'salaryRange',
            title: 'Salary Range',
            type: 'string',
            description: 'Human readable salary range (e.g. $60k–$80k, DOE)',
        }),

        defineField({
            name: 'description',
            title: 'Full Description',
            type: 'array',
            of: [
                {type: 'block'},
                {type: 'image', options: {hotspot: true}},
            ],
        }),

        defineField({
            name: 'responsibilities',
            title: 'Responsibilities',
            type: 'array',
            of: [{type: 'string'}],
        }),

        defineField({
            name: 'qualifications',
            title: 'Qualifications',
            type: 'array',
            of: [{type: 'string'}],
        }),

        defineField({
            name: 'benefits',
            title: 'Benefits',
            type: 'array',
            of: [{type: 'string'}],
        }),

        defineField({
            name: 'applyEmail',
            title: 'Apply Email',
            type: 'string',
            description: 'Email address to receive applications (optional)',
            // validation: (Rule) =>
            //     Rule.uri({allowRelative: false, scheme: ['mailto']}).warning('use mailto:...') ,
        }),

        defineField({
            name: 'applyUrl',
            title: 'Apply URL',
            type: 'url',
            description: 'External apply link (optional)',
        }),

        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{type: 'string'}],
        }),

        defineField({
            name: 'featured',
            title: 'Featured',
            type: 'boolean',
            description: 'Show this job prominently on lists',
            initialValue: false,
        }),
    ],

    preview: {
        select: {
            title: 'title',
            subtitle: 'department',
            date: 'postedAt',
        },
        prepare(selection) {
            const {title, subtitle, date} = selection
            return {
                title,
                subtitle: subtitle ? `${subtitle} • ${date ? new Date(date).toLocaleDateString() : ''}` : date ? new Date(date).toLocaleDateString() : '',
            }
        },
    },
})