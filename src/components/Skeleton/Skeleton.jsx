import styles from './Skeleton.module.css'

/** Placeholder shaped like an AircraftCard, shown while the fleet is loading. */
export function AircraftCardSkeleton() {
    return (
        <div className={styles.card}>
            <div className={`${styles.block} ${styles.image}`} />
            <div className={styles.body}>
                <div className={`${styles.block} ${styles.title}`} />
                <div className={`${styles.block} ${styles.price}`} />
                <div className={styles.buttons}>
                    <div className={`${styles.block} ${styles.button}`} />
                    <div className={`${styles.block} ${styles.button}`} />
                </div>
            </div>
        </div>
    )
}

export function AircraftGridSkeleton({ count = 6 }) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <AircraftCardSkeleton key={i} />
            ))}
        </>
    )
}
