import { serialize } from "cookie";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,res:NextResponse) {
    const cookieStore = cookies();
    const token = cookieStore.get('authToken');

    if(token && token.value === 'admin_token'){
        return NextResponse.json({authenticated: true});
    }
    return NextResponse.json({authenticated: false});
}
export async function POST(req:NextRequest,res:NextResponse) {
    const {password} = await req.json();

    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    if(password !== ADMIN_PASSWORD){
        return NextResponse.json({is_success: false, message: 'Invalid password'}, {status: 401});
    }

    const authToken = process.env.ADMIN_TOKEN;

    if(!authToken) return NextResponse.json({is_success: false, message: 'Token not found'}, {status: 500});

    const cookie = serialize('authToken', authToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 3600
    })

    return NextResponse.json({is_success: true}, {
        headers: {
            'Set-Cookie': cookie
        }
    })

}
