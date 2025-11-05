import styles from './OLogo.module.scss';
import wheelImg from '@/assets/wheel.svg';
const OLogo = () => {
    return <img className={styles['o-letter']} src={wheelImg} alt="Wheel Logo" />
}
export default OLogo