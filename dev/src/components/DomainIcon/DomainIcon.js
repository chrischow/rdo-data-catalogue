import { GiOpenBook } from 'react-icons/gi';
import { ImAirplane } from 'react-icons/im';
import { IoIosPeople } from 'react-icons/io';
import { BsGlobe } from 'react-icons/bs';
import { FaTools } from 'react-icons/fa';
import { MdHealthAndSafety } from 'react-icons/md';

export default function DomainIcon(props) {
  if (props.dataDomain === 'Ops') {
    return <ImAirplane style={props.styleParams} />
  }
  
  if (props.dataDomain === 'Manpower'){
    return <IoIosPeople style={props.styleParams} />
  }
  
  if (props.dataDomain === 'Intel'){
    return <BsGlobe style={props.styleParams} />
  }
  
  if (props.dataDomain === 'Engineering'){
    return <FaTools style={props.styleParams} />
  }
  
  if (props.dataDomain === 'Training') {
    return <GiOpenBook style={props.styleParams} />
  }
  
  if (props.dataDomain === 'Safety') {
    return <MdHealthAndSafety style={props.styleParams} />
  }
}