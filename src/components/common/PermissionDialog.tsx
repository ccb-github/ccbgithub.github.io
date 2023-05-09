
import { useEffect } from "react"


export default function PermissionDialog() {
  const catgorys = ["A", "B"]
  let viewRef
  useEffect( () => {
    console.log(viewRef)

  }, [])
  const submitPermissionChange =async () => {
    
  }
  return (
    <dialog ref={viewRef} >
      
      <div>
        <h2>Allowed catgory</h2>
        {
            catgorys?.map( catgory => (
                <input type="radio" value={catgory} multiple={true}/>
            ))
        }
        
      </div>  
    </dialog>
  )  
}