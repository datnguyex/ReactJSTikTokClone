import * as request from '~/utils/httpRequest';
export const search = async (q, type = 'less') => {
    // axios
    //     .get(`/users/search`, {
    //         params: {
    //             q: debounc   e,
    //             type: 'less',
    //         },
    //     })
    try {
        const res = await request.get(`/users/search`, {
            params: {
                q,
                type,
            },
        });
        return res.data;
        // .then((res) => {
        //     setSearchResult(res.data);
        //     console.log('res.data', res);
        //     setLoading(false);
        // });
    } catch (e) {
        console.log(e);
    }
};
