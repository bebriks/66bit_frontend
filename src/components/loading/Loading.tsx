import './Loading.scss'
import '../../App.scss'

export const Loading = () => {
    return (
        <div className="loader">
            <svg className="circular-loader" viewBox="25 25 50 50">
                <circle className="loader-path" cx="50" cy="50" r="20" fill="none"></circle>
            </svg>
        </div>
    )
}