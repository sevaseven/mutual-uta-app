import React from 'react'
import { Button, Toolbar, Tooltip } from '@material-ui/core';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import ExcelIcon from '../../assets/excelIcon.png'
import ExcelIconVerde from '../../assets/excelIconVerde.png'
import PrintIcon from '@material-ui/icons/Print';

const ToolbarXLSPDF = ({ handlePrint, handleGeneratePdf, handleExportExcel, iconVerde = false }) => {
    return (
        <Toolbar
            style={{ placeContent: 'flex-end' }}
        >   {handlePrint &&
            <Tooltip title="Imprimir">
                <Button
                    onClick={handlePrint}
                >
                    <PrintIcon fontSize="large" />
                </Button>
            </Tooltip>
            }
            {handleGeneratePdf &&
                <Tooltip title="Exportar Pdf">
                    <Button
                        onClick={() => handleGeneratePdf()}
                    >
                        <PictureAsPdfIcon fontSize="large" />
                    </Button>
                </Tooltip>
            }
            {handleExportExcel && !iconVerde &&
                <Tooltip title="Exportar Excel">
                    <Button
                        style={{ marginRight: 15 }}
                        onClick={() => handleExportExcel()}
                    >
                        <img src={ExcelIcon} alt='excelIcon' style={{ height: 33 }}></img>
                    </Button>
                </Tooltip>
            }
            {handleExportExcel && iconVerde &&
                <Tooltip title="Exportar Excel">
                    <Button
                        style={{ marginRight: 20 }}
                        variant="contained"
                        color="primary"
                        onClick={() => handleExportExcel()}
                    >
                        <img src={ExcelIconVerde} alt='excelIcon' style={{ height: 25 }}></img>
                    </Button>
                </Tooltip>
            }
        </Toolbar>
    )
}

export default ToolbarXLSPDF