import { computed, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Synchronise l'onglet actif d'une page à onglets avec un paramètre de requête dans l'URL
// (ex. /lore?tab=corporations), pour pouvoir partager/rafraîchir un lien vers un onglet précis.
export function useTabQuery<T extends { id: string }>(tabs: T[], param = 'tab') {
  const route = useRoute()
  const router = useRouter()

  const activeId = computed(() => {
    const q = route.query[param]
    const id = Array.isArray(q) ? q[0] : q
    return tabs.some((t) => t.id === id) ? (id as string) : tabs[0]!.id
  })

  watchEffect(() => {
    if (route.query[param] !== activeId.value) {
      router.replace({ query: { ...route.query, [param]: activeId.value } })
    }
  })

  function selectTab(id: string) {
    router.replace({ query: { ...route.query, [param]: id } })
  }

  return { activeId, selectTab }
}
