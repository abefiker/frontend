import { useState } from 'react';
import { useRouter } from 'next/router';

const FilterForm = () => {
    const router = useRouter();
    const [filters, setFilters] = useState({
        name: '',
        minPrice: '',
        maxPrice: '',
        location: '',
        hasBalcony: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, } = e.target;
        const target = e.target as HTMLInputElement;
        setFilters((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? target.checked : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Update URL with filters as query parameters
        router.push({
            pathname: '/houses',
            query: filters
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={filters.name}
                placeholder="Search by name"
                onChange={handleChange}
            />
            <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                placeholder="Min price"
                onChange={handleChange}
            />
            <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                placeholder="Max price"
                onChange={handleChange}
            />
            <input
                type="text"
                name="location"
                value={filters.location}
                placeholder="Location"
                onChange={handleChange}
            />
            <label>
                Has Balcony:
                <input
                    type="checkbox"
                    name="hasBalcony"
                    checked={filters.hasBalcony}
                    onChange={handleChange}
                />
            </label>
            <button type="submit">Apply Filters</button>
        </form>
    );
};

export default FilterForm;
