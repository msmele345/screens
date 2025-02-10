import { NavLink, NavLinkRenderProps } from "react-router";
import classes from "./MainNavigation.module.css";
import useAuth from "../hooks/useAuth";

function MainNavigation() {
    const { onLogout } = useAuth();

    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    <li>
                        <NavLink
                            to="/login"
                            className={({ isActive }: NavLinkRenderProps) =>
                                isActive ? classes.active : undefined
                            }
                            end
                            onClick={onLogout}
                        >
                            Logout
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation;
