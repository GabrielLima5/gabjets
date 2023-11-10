import { useState } from 'react';
import { useAircraftContext } from '../context/AircraftContext';
import { useModalContext } from '../context/ModalContext';

export const useAircraftPurchase = () => {
    const {aircraftToBuy, setAircraftToBuy} = useAircraftContext()
    const { display, setDisplay } = useModalContext()

    const checkAircraftAdded = (aircraft) => {
        return aircraftToBuy.filter((aircraftAdded) => aircraftAdded.id === aircraft.id);
    };

    const handleAddAircraftToBuy = (aircraft) => {
        setDisplay(true);

        if (aircraftToBuy.length === 0) {
            setAircraftToBuy((aircrafts) => [...aircrafts, aircraft]);
        } else if (aircraftToBuy.length > 2){
            return
        } else {
            if (checkAircraftAdded(aircraft).length) {
                return;
            } else {
                setAircraftToBuy((aircrafts) => [...aircrafts, aircraft]);
            }
        }
    }

    const handleDeleteAircraft = (aircraft) => {
        const filteredAircrafts = aircraftToBuy.filter(aircraftToBuy => aircraftToBuy.id !== aircraft.id)
        setAircraftToBuy((aircrafts) => [...filteredAircrafts])
    }

    return { aircraftToBuy, display, handleAddAircraftToBuy, handleDeleteAircraft };
}