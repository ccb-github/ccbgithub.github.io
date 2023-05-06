import { useContext, useEffect, useRef } from "react"
import { AppContext } from "../AppProvider"
import { SchemaResultMapper } from "#/types/schema"

export const AllowedCatgoryList = ({list}: {list: string[]}) => {
  const appContext = useContext(AppContext)
  const { useCollection } = appContext
  const targetCollection = useCollection("Catgory")
  const allCatgorysRef = useRef<any[]>([])
  useEffect( () => {
    (async () => {
      const catgorys = await targetCollection?.find()
      catgorys ? allCatgorysRef.current = catgorys.map( item => item.name) : null 
    })()
    
  }, [targetCollection])
  return(

    <tr>
      <th scope="row">Catgory</th>
      {
        allCatgorysRef.current.map(
          catgory => <td><b>{catgory}</b></td>
        )
      }
    </tr>
  )
}