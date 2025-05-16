import { supabase } from '@/integrations/supabase/client';
import type { Database } from '../types/database.types';

type CategoryWithBusinessCount = {
  business_count: { count: number } | null;
} & Category;

export type Category = Database['public']['Tables']['categories']['Row'];

export interface CategoryWithCount extends Category {
  business_count: number;
}

export const categoryService = {
  async getAllCategories(): Promise<Category[]> {
    console.log('Fetching categories...');
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }

    console.log('Categories fetched:', data);
    return data || [];
  },

  async getCategoryById(id: string): Promise<Category | null> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching category:', error);
      throw error;
    }

    return data;
  },

  async getCategoriesWithCount(): Promise<CategoryWithCount[]> {
    console.log('Fetching categories with business count...');
    const { data, error } = await supabase
      .from('categories')
      .select(`
        *,
        business_count: businesses(count)
      `)
      .order('name') as { data: CategoryWithBusinessCount[] | null, error: any };

    if (error) {
      console.error('Error fetching categories with count:', error);
      throw error;
    }

    console.log('Categories with count fetched:', data);
    return data?.map(category => ({
      ...category,
      business_count: category.business_count?.[0]?.count ?? 0
    })) || [];
  }
};
