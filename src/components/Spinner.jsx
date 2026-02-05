import { BarLoader } from 'react-spinners'



const Spinner = ({ color = 'blue', size = '150' }) => {

    const override = {
        display: 'block',
        margin: '0 auto 50px auto'
    }

    return (
        <div>
            <BarLoader
                color={color}
                // loading={loading}
                aria-label='Loading...'
                cssOverride={override}
            />
        </div>
    )
}

export default Spinner