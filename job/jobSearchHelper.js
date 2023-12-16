import collection from '../mongo.js'; // Ensure this path is correct

export const searchJobs = async ({ title, company, city, state, keyWords, salary }) => {
    
    const query = {};

    if (state) query.state = state;
    if (city) query.city = city;
    if (salary) {
            query.salary = { $gte: salary };

    }

    // Optional fields
    if (title) query.title = new RegExp(title, 'i');
    if (company) query.companyName = new RegExp(company, 'i');
    if (keyWords) {
        // Assuming 'requirements' or 'tags' field in jobSchema contains keywords
        query.requirements = { $in: keyWords.split(/\s*,\s*/).map(word => new RegExp(word, 'i')) };
    }

    try {
        const jobResults = await collection.collectionPosts.find(query);
        return jobResults;
    } catch (error) {
        throw error;
    }
};


