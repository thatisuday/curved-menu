const styles = `
    .curved-menu{
        position: relative;
        display: inline-block;
    }

    .curved-menu__curve-container{
        width : 100%;
        height : 100%;
        overflow : hidden;
        box-sizing : border-box;
        position : absolute;
        left : 0;
        top : 0;
    }

    .curved-menu__curve-container__curve{
        border-radius: 100%;
        border: 1px dashed #999;
        box-sizing: border-box;
        position: absolute;
        right: 0px;
        top: 50%;
        transform: translateY(-50%);
    }

    .curved-menu__point{
        position: absolute;
        z-index: 1;
        cursor: pointer;
    }

    .curved-menu__point__bullet{
        border-radius: 100%;
        background: #dc6262;
        box-sizing: border-box;
        z-index: 1;
        box-shadow: 0 0 0 3px #fff, 0 0 0 6px #eee;
    }

    .curved-menu__point__label{
        position: absolute;
        top: 50%;
        margin-left: 10px;
        padding: 5px 15px;
        transform: translateY(-50%);
        color: #333;
        background: #eee;
        box-sizing: border-box;
        border-radius: 30px;
        font-size: 12px;
        text-transform: uppercase;
        font-family: sans-serif;
        letter-spacing: 0.5px;
        white-space: nowrap;
        opacity: 0;
        transition: opacity 300ms ease;
        box-shadow: 1px 1px 0 2px #fff, 2px 2px 5px rgba(0, 0, 0, 0.1);
    }
    .curved-menu__point:hover .curved-menu__point__label{
        opacity: 1;
    }
`;

export default styles;