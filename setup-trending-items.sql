-- Setup Trending Items for Homepage
-- Run this in Supabase SQL editor after running supabase-schema-homepage.sql

-- First, get the trending section ID
DO $$
DECLARE
    trending_section_id uuid;
BEGIN
    SELECT id INTO trending_section_id 
    FROM public.homepage_sections 
    WHERE key = 'trending';
    
    IF trending_section_id IS NOT NULL THEN
        -- Insert trending items
        INSERT INTO public.homepage_section_items (
            section_id,
            title,
            subtitle,
            image,
            href,
            category,
            read_time,
            badge,
            rating,
            price,
            original_price,
            discount_label,
            position,
            is_featured
        ) VALUES
        (
            trending_section_id,
            'Memory Foam Revolution',
            'Discover the latest in sleep technology with advanced cooling and pressure relief',
            '/cascade-main.jpg',
            '/mattresses',
            'Technology',
            '5 min read',
            'Trending',
            4.8,
            599,
            799,
            '25% OFF',
            1,
            true
        ),
        (
            trending_section_id,
            'Hybrid Comfort',
            'The perfect blend of support and softness for ultimate sleep experience',
            '/cascade-features.jpg',
            '/mattresses',
            'Comfort',
            '3 min read',
            'Popular',
            4.9,
            699,
            899,
            '22% OFF',
            2,
            true
        ),
        (
            trending_section_id,
            'Eco-Friendly Sleep',
            'Sustainable materials for better rest and a healthier planet',
            '/cascade-height.jpg',
            '/mattresses',
            'Sustainability',
            '4 min read',
            'New',
            4.7,
            549,
            649,
            '15% OFF',
            3,
            false
        ),
        (
            trending_section_id,
            'Smart Sleep Tracking',
            'Monitor your sleep patterns and optimize your rest with AI technology',
            '/cascade-sleepers.jpg',
            '/mattresses',
            'Innovation',
            '6 min read',
            'Hot',
            4.6,
            799,
            999,
            '20% OFF',
            4,
            false
        ),
        (
            trending_section_id,
            'Luxury Bedding',
            'Premium comfort for ultimate relaxation and rejuvenation',
            '/bedcollect.jpeg',
            '/bedding',
            'Luxury',
            '4 min read',
            'Premium',
            4.9,
            299,
            399,
            '25% OFF',
            5,
            true
        )
        ON CONFLICT (section_id, position) DO UPDATE SET
            title = EXCLUDED.title,
            subtitle = EXCLUDED.subtitle,
            image = EXCLUDED.image,
            href = EXCLUDED.href,
            category = EXCLUDED.category,
            read_time = EXCLUDED.read_time,
            badge = EXCLUDED.badge,
            rating = EXCLUDED.rating,
            price = EXCLUDED.price,
            original_price = EXCLUDED.original_price,
            discount_label = EXCLUDED.discount_label,
            is_featured = EXCLUDED.is_featured;
            
        RAISE NOTICE 'Trending items inserted successfully for section ID: %', trending_section_id;
    ELSE
        RAISE NOTICE 'Trending section not found. Please run supabase-schema-homepage.sql first.';
    END IF;
END $$;
