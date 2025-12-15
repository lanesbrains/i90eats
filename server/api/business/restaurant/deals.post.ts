import { defineEventHandler, readBody } from 'h3'
import { supabase } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { restaurantSlug, ownerEmail, deal, action } = body

  if (!restaurantSlug || !action || !ownerEmail) {
    throw createError({ statusCode: 400, message: 'restaurantSlug, ownerEmail, and action are required' })
  }

  try {
    const { data: restaurant } = await supabase
      .from('restaurants')
      .select('id')
      .eq('slug', restaurantSlug)
      .eq('owner_email', ownerEmail)
      .single()

    if (!restaurant) {
      throw createError({ statusCode: 404, message: 'Restaurant not found or unauthorized' })
    }

    switch (action) {
      case 'add':
        if (!deal) throw createError({ statusCode: 400, message: 'Deal data required for add action' })
        
        const { data: newDeal, error: addError } = await supabase
          .from('deals')
          .insert({
            restaurant_id: restaurant.id,
            title: deal.title,
            description: deal.description,
            terms: deal.terms,
            start_date: deal.startDate,
            end_date: deal.endDate,
            active: deal.active !== false,
            day_of_week: deal.dayOfWeek,
            locations: deal.locations || []
          })
          .select()
          .single()

        if (addError) throw addError
        return { success: true, deal: newDeal }

      case 'update':
        if (!deal || !deal.id) {
          throw createError({ statusCode: 400, message: 'Deal data with id required for update action' })
        }

        const { data: updatedDeal, error: updateError } = await supabase
          .from('deals')
          .update({
            title: deal.title,
            description: deal.description,
            terms: deal.terms,
            start_date: deal.startDate,
            end_date: deal.endDate,
            active: deal.active,
            day_of_week: deal.dayOfWeek,
            locations: deal.locations,
            updated_at: new Date().toISOString()
          })
          .eq('id', deal.id)
          .eq('restaurant_id', restaurant.id)
          .select()
          .single()

        if (updateError) throw updateError
        return { success: true, deal: updatedDeal }

      case 'delete':
        if (!deal?.id) {
          throw createError({ statusCode: 400, message: 'Deal id required for delete action' })
        }

        const { error: deleteError } = await supabase
          .from('deals')
          .delete()
          .eq('id', deal.id)
          .eq('restaurant_id', restaurant.id)

        if (deleteError) throw deleteError
        return { success: true, message: 'Deal deleted' }

      case 'list':
        const { data: deals, error: listError } = await supabase
          .from('deals')
          .select('*')
          .eq('restaurant_id', restaurant.id)
          .order('created_at', { ascending: false })

        if (listError) throw listError
        return { success: true, deals }

      default:
        throw createError({ statusCode: 400, message: `Unknown action: ${action}` })
    }
  } catch (error: any) {
    console.error('Error managing deals:', error)
    throw createError({ statusCode: 500, message: error.message })
  }
})
