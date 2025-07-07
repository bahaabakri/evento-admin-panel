import { Link } from "react-router-dom";
import styles from './Logo.module.scss';
import OLogo from "../OlLgo/OLogo";
// import wheelImg from '@/assets/wheel.svg';
const Logo = () => {
return (
    <div className={styles['logo-wrapper']}>
        <Link  to="/" className="normal-link">
            <div className={styles['letters']}>
                <span className={styles['e-letter']}>E</span>
                <span>vent</span>
                {/* <img className={styles['o-letter']} src={wheelImg} alt="Wheel Logo" /> */}
                <OLogo />
            </div>
        </Link>
    </div>
    )
}

export default Logo