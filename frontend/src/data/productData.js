
export const getProductExtraDetails = (id) => {
    // Mock logic: generate different details based on ID parities
    const numId = parseInt(id, 10) || 0;

    // Logic: 
    // Even IDs -> Serums/Oils (30ml, specific ingredients)
    // Odd IDs -> Creams (50ml, different ingredients)

    if (numId % 2 === 0) {
        return {
            type: 'serum',
            ingredients: [
                'Aqua (Water)',
                'Sodium Hyaluronate (Hyaluronic Acid)',
                'Ascorbic Acid (Vitamin C)',
                'Propanediol',
                'Panthenol (Vitamin B5)',
                'Ferulic Acid',
                'Tocopherol (Vitamin E)'
            ],
            volume: '30 ml',
            country: 'Ukraine',
            skinType: 'All types'
        };
    } else {
        return {
            type: 'cream',
            ingredients: [
                'Aqua (Water)',
                'Aloe Barbadensis Leaf Juice',
                'Caprylic/Capric Triglyceride',
                'Butyrospermum Parkii (Shea) Butter',
                'Cetearyl Alcohol',
                'Simmondsia Chinensis (Jojoba) Seed Oil',
                'Camellia Sinensis (Green Tea) Leaf Extract'
            ],
            volume: '50 ml',
            country: 'Ukraine',
            skinType: 'Normal, Dry'
        };
    }
};
