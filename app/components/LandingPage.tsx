import HouseList from './HouseList'
import HotelList from './HotelsList'
import PensionList from './pensionList'
import Carousel from "./Carousel";
// import UpNext from "./UpNext";
// import TheatersHouse from './TheatersHouse'
export default function LandingPage() {
    return (
        <>
            <Carousel />
            <HouseList />
            <HotelList />
            <PensionList />
        </>
    )
}