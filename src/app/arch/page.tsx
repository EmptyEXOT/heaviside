import {Arch} from "@/arch/Arch";
import cls from './style.module.css'

export default function Home() {
    return (
        <main className={cls.mainContainer}>
            <div className={cls.container}>
                <Arch/>
            </div>
        </main>
    )
}
