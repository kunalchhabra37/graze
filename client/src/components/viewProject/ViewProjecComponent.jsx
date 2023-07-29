import { useLocation } from 'react-router-dom'

export const ViewProjectComponent = () => {
    const location = useLocation()
    const { projectId } = location.state
    return (
            <h1 style={{color:"white"}}>{ projectId }</h1>
    );
};
