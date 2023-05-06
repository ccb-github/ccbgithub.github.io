import { FaNode } from 'react-icons/fa';
import RelatedObjSelect from '../components/form/RelatedObjSelect';
import { SchemaName } from '#/types/schema';

const ignoreField = [
  "ownerId"
]

export default function templateHtml(prop) {
	var DATE_FORMAT = 'YYYY-MM-DD HH:MM:SS';
	const DOUBLE_PRECISION = 0.0001
  
  if (prop.name === 'ownerId') {
    return null 
  }
  else if (prop.type === 'int')
    return (
      <div key={prop.name} className="form-group">
        <label className="control-label" htmlFor={prop.name}>
          {prop.name}
        </label>
        <div className="w-full">
          <input
            id={prop.name}
            name={prop.name}
            type="number"
            className="form-control input-md w-full"
          />
        </div>
      </div>
    )
  else if (prop.type === 'double')
    return (
      <div key={prop.name} className="form-group">
        <label className=" control-label" htmlFor={prop.name}>
          {prop.name}
        </label>
        <div className=" w-full">
          <input
            id={prop.name}
            name={prop.name}
            type="number"
            step={DOUBLE_PRECISION}
            required={prop.optional}
            placeholder={`please Enter your ${prop.name} here, presion up to ${DOUBLE_PRECISION}`}
            className="form-control input-md w-full"
          />
        </div>
      </div>
    )
  else if (prop.type === 'date') {
    return (
      <div key={prop.name} className="form-group">
        <div className="flex w-full justify-between">
          <label className="control-label" htmlFor="prop.name">
            {prop.name}
          </label>
          <button className='border-l-black'>date</button>
          <button className='border-l-black'>Refresh</button>
          <button className='border-l-black' disabled={false}>required</button>
        </div>
        <div className="w-full">
          <input
            id={prop.name}
            name={prop.name}
            type="datetime-local"
            defaultValue={new Date().toISOString()}
            placeholder={`please Enter your ${prop.name}, fromat: ${DATE_FORMAT} here`}
            className="form-control input-md w-full"
            required={prop.optional}
          />
          <button className='border-l-black' type="button"><FaNode/></button>
        </div>
      </div>
    )
  } else if (prop.type === 'string') {
    return (
      <div key={prop.name} className="form-group">
        <div className="flex w-full justify-between">
          <label className="control-label" htmlFor={prop.name}/>
        </div>
        
    
        <div className=" w-full">
          <input
            id={prop.name}
            name={prop.name}
            type="text"
            placeholder={`please Enter your ${prop.name} here`}
            className="form-control input-md w-full"
            required={!prop.optional}
          />
        </div>
      </div>
    )
  } else if (prop.type === 'list') {
    return (
      <div key={prop.name} className="form-group">
        <label className=" control-label" htmlFor={prop.name}>
          {prop.name}
        </label>
        <div className=" w-full">
          <input
            id={prop.name}
            name={prop.name}
            type="text"
            placeholder={`please Enter your ${prop.name} here`}
            className="form-control input-md w-full"
            required={!prop.optional}
          />
        </div>
      </div>
    )
  } else if (prop.type === 'objectId') {
    return null 
  } 
   else if (prop.type === 'object' && prop.objectType === 'Location') {
    console.log('Embed field Loation ' + JSON.stringify(prop))
    return (
      <div key={prop.name} className="form-group">
        <div>
          <label className=" control-label" htmlFor={prop.name}>
            {prop.name}
          </label>
          <button>location</button>
          <button disabled>required</button>
        </div>
        <div className="w-full">
          <label
            className="control-label"
            htmlFor={`${prop.name}Longitude`}
          >{`${prop.name}.longitude`}</label>
          <input
            id={`${prop.name}-longitude`}
            name={prop.name}
            type="text"
            placeholder={`please Enter your ${prop.name}.longtitude here, Location content, required=${prop.optional}`}
          />
          <label className="control-label" htmlFor={`${prop.name}_Latitude`}>
            {' '}
            {`${prop.name}.latitude`}{' '}
          </label>
          <input
            id={`${prop.name}-latitude`}
            name={`${prop.name}`}
            type="text"
            placeholder={`please Enter your ${prop.name} latitude here, Location content,    required=" + prop.optional `}
          />
        </div>
      </div>
    )
  }
  // onclick="this.focus();this.select();"
  else if (prop.type === 'object' && prop.objectType === 'Qrcode') {
    return (
      <div key={prop.name} className="form-group">
        <label className=" control-label" htmlFor={`${prop.name}`}>
          {prop.name}
        </label>
        <div className=" w-full">
          <input
            id={prop.name}
            name={prop.name}
            type="textarea"
            placeholder={`please Enter your ${
              prop.name
            } here,generate qrcode base on the content entered   ${
              prop.optional ? '' : 'required'
            }`}
          />{' '}
        </div>
        <div id="qrcode" title="Preview of your qrcode"></div>
      </div>
    )
  } else {
    return (
      <div key={prop.name} className="form-group">
        <label className="control-label" htmlFor={`${prop.name}`}>
          {prop.name}{' '}
        </label>
        <div className="w-full flex-row">
          <RelatedObjSelect
            objectType={prop.objectType as SchemaName}
            linked={false}
            //@ts-ignore
            className="flex-1"
          />
          {/* <input
            id={prop.name}
            name={prop.name}
            className="flex-1"
            type="text"
            placeholder={`Or just enter the primary key manually here ${
              prop.name
            }  ${prop.optional ? '' : 'required'}`}
          /> */}
        </div>
      </div>
    )
  }
};