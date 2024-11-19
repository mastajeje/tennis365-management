import { useEffect, useRef } from "react"
import styles from './styles/components.module.css'
interface IModalProps {
    children: React.ReactNode;
    open: boolean;
}

export default function Modal({
    children,
    open,
}:IModalProps){
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(()=>{
        if(dialogRef.current?.open && !open){
            dialogRef.current.close();
        } else if(!dialogRef.current?.open && open){
            dialogRef.current?.showModal();
        }
    },[open])


    return(
        <dialog className={styles.Modal} ref={dialogRef}>
            {children}
        </dialog>
    )
}