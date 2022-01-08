import { authService } from '../components/auth';

export const requestOptions = {
    get() {
        return {
            method: 'GET',
            ...headers()
        };
    },
    post() {
        return {
            method: 'POST',
            ...headers(),
            body: JSON.stringify(body)
        };
    },
    patch(body) {
        return {
            method: 'PATCH',
            ...headers(),
            body: JSON.stringify(body)
        };
    },
    put(body) {
        return {
            method: 'PUT',
            ...headers(),
            body: JSON.stringify(body)
        };
    },
    delete(params) {
        return {
            method: 'DELETE',
            ...headers(),
            body: params
        };
    },
    headersData() {
        return {
            ...headers()
        }
    }
}

function headers() {
    const currentUser = authService.currentUserValue || {};
    const authHeader = currentUser.token ? { 'Authorization': 'Bearer ' + currentUser.token } : {}
    return {
        headers: {
            ...authHeader,
            'Content-Type': 'application/json; charset=utf-8',
            'Accept-Language': currentUser.language
        }
    }
}