export async function deleteofficers(id: string | number): Promise<any> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL
    const endpoint = `/api/blog/delete/id/${id}`
  
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'DELETE',
      })
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
  
      return await response.json()
    } catch (error) {
      console.error('Error deleting user account:', error)
      throw error
    }
  }
  