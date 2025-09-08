import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

// Avatar image imports
import avatar_01 from '../../assets/images/avatars/svg-avatars/avatar-1-svgrepo-com.svg'
import avatar_02 from '../../assets/images/avatars/svg-avatars/avatar-2-svgrepo-com.svg'
import avatar_03 from '../../assets/images/avatars/svg-avatars/avatar-3-svgrepo-com.svg'
import avatar_04 from '../../assets/images/avatars/svg-avatars/avatar-4-svgrepo-com.svg'
import avatar_05 from '../../assets/images/avatars/svg-avatars/avatar-5-svgrepo-com.svg'
import avatar_06 from '../../assets/images/avatars/svg-avatars/avatar-6-svgrepo-com.svg'
import avatar_07 from '../../assets/images/avatars/svg-avatars/avatar-7-svgrepo-com.svg'
import avatar_08 from '../../assets/images/avatars/svg-avatars/avatar-8-svgrepo-com.svg'
import avatar_09 from '../../assets/images/avatars/svg-avatars/avatar-9-svgrepo-com.svg'
import avatar_10 from '../../assets/images/avatars/svg-avatars/avatar-10-svgrepo-com.svg'
import avatar_11 from '../../assets/images/avatars/svg-avatars/avatar-11-svgrepo-com.svg'
import avatar_12 from '../../assets/images/avatars/svg-avatars/avatar-12-svgrepo-com.svg'
import avatar_13 from '../../assets/images/avatars/svg-avatars/avatar-13-svgrepo-com.svg'
import avatar_14 from '../../assets/images/avatars/svg-avatars/avatar-14-svgrepo-com.svg'
import avatar_15 from '../../assets/images/avatars/svg-avatars/avatar-15-svgrepo-com.svg'
import avatar_16 from '../../assets/images/avatars/svg-avatars/avatar-16-svgrepo-com.svg'
import avatar_17 from '../../assets/images/avatars/svg-avatars/avatar-17-svgrepo-com.svg'
import avatar_18 from '../../assets/images/avatars/svg-avatars/avatar-18-svgrepo-com.svg'
import avatar_19 from '../../assets/images/avatars/svg-avatars/avatar-19-svgrepo-com.svg'
import avatar_20 from '../../assets/images/avatars/svg-avatars/avatar-20-svgrepo-com.svg'
import avatar_21 from '../../assets/images/avatars/svg-avatars/avatar-21-svgrepo-com.svg'
import avatar_22 from '../../assets/images/avatars/svg-avatars/avatar-22-svgrepo-com.svg'
import avatar_23 from '../../assets/images/avatars/svg-avatars/avatar-23.svg'
import avatar_24 from '../../assets/images/avatars/svg-avatars/avatar-24.svg'
import avatar_25 from '../../assets/images/avatars/svg-avatars/avatar-25.svg'
import avatar_26 from '../../assets/images/avatars/svg-avatars/avatar-26.svg'
import avatar_27 from '../../assets/images/avatars/svg-avatars/avatar-27.svg'
import avatar_28 from '../../assets/images/avatars/svg-avatars/avatar-28.svg'
import avatar_29 from '../../assets/images/avatars/svg-avatars/avatar-29.svg'
import avatar_30 from '../../assets/images/avatars/svg-avatars/avatar-30.svg'
import avatar_31 from '../../assets/images/avatars/svg-avatars/avatar-31.svg'
import avatar_32 from '../../assets/images/avatars/svg-avatars/avatar-32.svg'
import avatar_33 from '../../assets/images/avatars/svg-avatars/avatar-33.svg'
import avatar_34 from '../../assets/images/avatars/svg-avatars/avatar-34.svg'
import avatar_35 from '../../assets/images/avatars/svg-avatars/avatar-35.svg'
import avatar_36 from '../../assets/images/avatars/svg-avatars/avatar-36.svg'
import avatar_37 from '../../assets/images/avatars/svg-avatars/avatar-37.svg'
import avatar_38 from '../../assets/images/avatars/svg-avatars/avatar-38.svg'
import avatar_39 from '../../assets/images/avatars/svg-avatars/avatar-39.svg'
import avatar_40 from '../../assets/images/avatars/svg-avatars/avatar-40.svg'
import avatar_41 from '../../assets/images/avatars/svg-avatars/avatar-41.svg'
import avatar_42 from '../../assets/images/avatars/svg-avatars/avatar-42.svg'
import avatar_43 from '../../assets/images/avatars/svg-avatars/avatar-43.svg'
import avatar_44 from '../../assets/images/avatars/svg-avatars/avatar-44.svg'
import avatar_45 from '../../assets/images/avatars/svg-avatars/avatar-45.svg'
import avatar_46 from '../../assets/images/avatars/svg-avatars/avatar-46.svg'
import avatar_47 from '../../assets/images/avatars/svg-avatars/avatar-47.svg'
import avatar_48 from '../../assets/images/avatars/svg-avatars/avatar-48.svg'
import avatar_49 from '../../assets/images/avatars/svg-avatars/avatar-49.svg'
import avatar_50 from '../../assets/images/avatars/svg-avatars/avatar-50.svg'


const avatarList = [
    { img: avatar_01, name: "avatar_01" },
    { img: avatar_02, name: "avatar_02" },
    { img: avatar_03, name: "avatar_03" },
    { img: avatar_04, name: "avatar_04" },
    { img: avatar_05, name: "avatar_05" },
    { img: avatar_06, name: "avatar_06" },
    { img: avatar_07, name: "avatar_07" },
    { img: avatar_08, name: "avatar_08" },
    { img: avatar_09, name: "avatar_09" },
    { img: avatar_10, name: "avatar_10" },
    { img: avatar_11, name: "avatar_11" },
    { img: avatar_12, name: "avatar_12" },
    { img: avatar_13, name: "avatar_13" },
    { img: avatar_14, name: "avatar_14" },
    { img: avatar_15, name: "avatar_15" },
    { img: avatar_16, name: "avatar_16" },
    { img: avatar_17, name: "avatar_17" },
    { img: avatar_18, name: "avatar_18" },
    { img: avatar_19, name: "avatar_19" },
    { img: avatar_20, name: "avatar_20" },
    { img: avatar_21, name: "avatar_21" },
    { img: avatar_22, name: "avatar_22" },
    { img: avatar_23, name: "avatar_23" },
    { img: avatar_24, name: "avatar_24" },
    { img: avatar_25, name: "avatar_25" },
    { img: avatar_26, name: "avatar_26" },
    { img: avatar_27, name: "avatar_27" },
    { img: avatar_28, name: "avatar_28" },
    { img: avatar_29, name: "avatar_29" },
    { img: avatar_30, name: "avatar_30" },
    { img: avatar_31, name: "avatar_31" },
    { img: avatar_32, name: "avatar_32" },
    { img: avatar_33, name: "avatar_33" },
    { img: avatar_34, name: "avatar_34" },
    { img: avatar_35, name: "avatar_35" },
    { img: avatar_36, name: "avatar_36" },
    { img: avatar_37, name: "avatar_37" },
    { img: avatar_38, name: "avatar_38" },
    { img: avatar_39, name: "avatar_39" },
    { img: avatar_40, name: "avatar_40" },
    { img: avatar_41, name: "avatar_41" },
    { img: avatar_42, name: "avatar_42" },
    { img: avatar_43, name: "avatar_43" },
    { img: avatar_44, name: "avatar_44" },
    { img: avatar_45, name: "avatar_45" },
    { img: avatar_46, name: "avatar_46" },
    { img: avatar_47, name: "avatar_47" },
    { img: avatar_48, name: "avatar_48" },
    { img: avatar_49, name: "avatar_49" },
    { img: avatar_50, name: "avatar_50" },
];

export default function AvatarGrid({ selectTile }) {
    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around",
                overflow: "hidden",
                backgroundColor: (theme) => theme.palette.background.paper,
                //backgroundColor: "orange",
                //width: 330,
                //height: 400,
                p: 1,
            }}
        >
            <Grid container spacing={1} columns={{xs: 5, sm: 7, md: 9}}>
                {avatarList.map((tile, idx) => (
                    <Grid
                        size={{ xs: 1 }}
                        key={tile.name}
                        sx={{
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: 50,
                        }}
                        onClick={() => selectTile?.(tile)}
                    >
                        <img
                            src={tile.img}
                            alt={tile.name}
                            style={{
                                width: 42,
                                height: 42,
                                objectFit: "cover",
                                borderRadius: "50%",
                                border: "2px solid #eee",
                            }}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}