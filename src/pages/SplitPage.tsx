import ConvertPage from './ConvertPage'; export default function SplitPage({onNavigate}:{onNavigate:(p:string)=>void}){return <ConvertPage toolId="split" onNavigate={onNavigate}/>}
