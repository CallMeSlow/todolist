// 这是一个展示数据统计组件

import { useTodoContext } from "@/context/TodoContext"

import styles from "./Todostats.module.css"

export default function TodoStats() {
    const { selector } = useTodoContext();
    
    return(
        <div className={styles.stats}>
            <span className={styles.statItem}>共有{selector.all}个任务</span>
            <span className={styles.statItem}>已完成{selector.completed}个</span>
            <span className={styles.statItem}>未完成{selector.active}个</span>
        </div>
    )
}