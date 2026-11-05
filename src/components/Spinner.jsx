import { BarLoader } from 'react-spinners'



const Spinner = ({ color = 'blue' }) => {

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