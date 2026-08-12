const Loader = (props) => {

    const { loading } = props;
    return (
        <>
            {
                loading ?
                    <div class="text-center">
                        <div class="spinner-border" style={{"width": "4rem", "height" : "4rem"}} role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    :
                    <></>
            }
        </>
    );
}

export default Loader;